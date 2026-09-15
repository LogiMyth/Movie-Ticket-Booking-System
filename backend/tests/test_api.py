import pytest


def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "UP"
    assert data["service"] == "Movie Ticket Booking Backend"
    assert "timestamp" in data


def test_get_all_movies(client):
    response = client.get("/api/movies")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Dune: Part Three"
    assert data[0]["durationMinutes"] == 165


def test_get_movie_by_id(client):
    response = client.get("/api/movies/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["title"] == "Dune: Part Three"

    # Nonexistent movie
    res_404 = client.get("/api/movies/999")
    assert res_404.status_code == 404


def test_get_shows_by_movie(client):
    response = client.get("/api/movies/1/shows")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["movieTitle"] == "Dune: Part Three"

    res_404 = client.get("/api/movies/999/shows")
    assert res_404.status_code == 404


def test_get_show_by_id(client):
    response = client.get("/api/shows/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["theaterName"] == "CinéPulse Grand Dolby"

    res_404 = client.get("/api/shows/999")
    assert res_404.status_code == 404


def test_get_show_seats(client):
    response = client.get("/api/shows/1/seats")
    assert response.status_code == 200
    seats = response.json()
    assert len(seats) == 3
    assert all(s["available"] is True for s in seats)


def test_create_and_lookup_booking(client):
    # 1. Successful booking
    payload = {
        "userId": 1,
        "showId": 1,
        "seatIds": [1, 2]
    }
    response = client.post("/api/bookings", json=payload)
    assert response.status_code == 201
    booking_data = response.json()
    assert booking_data["bookingId"] is not None
    assert booking_data["bookingReference"].startswith("CP-")
    assert booking_data["seats"] == ["A1", "A2"]
    assert float(booking_data["totalAmount"]) == 44.0

    booking_id = booking_data["bookingId"]
    reference = booking_data["bookingReference"]

    # 2. Check seats now unavailable
    seats_res = client.get("/api/shows/1/seats")
    seats = seats_res.json()
    s1 = next(s for s in seats if s["id"] == 1)
    s2 = next(s for s in seats if s["id"] == 2)
    s3 = next(s for s in seats if s["id"] == 3)
    assert s1["available"] is False
    assert s2["available"] is False
    assert s3["available"] is True

    # 3. Lookup by ID
    get_id_res = client.get(f"/api/bookings/{booking_id}")
    assert get_id_res.status_code == 200
    assert get_id_res.json()["bookingReference"] == reference

    # 4. Lookup by reference
    get_ref_res = client.get(f"/api/bookings/reference/{reference}")
    assert get_ref_res.status_code == 200
    assert get_ref_res.json()["bookingId"] == booking_id


def test_duplicate_seat_booking_conflict(client):
    # Book seat 1 first
    payload1 = {
        "userId": 1,
        "showId": 1,
        "seatIds": [1]
    }
    res1 = client.post("/api/bookings", json=payload1)
    assert res1.status_code == 201

    # Try booking seat 1 again for the same show
    payload2 = {
        "userId": 1,
        "showId": 1,
        "seatIds": [1, 3]
    }
    res2 = client.post("/api/bookings", json=payload2)
    assert res2.status_code == 409
    assert "already booked" in res2.json()["detail"].lower()


def test_invalid_booking_requests(client):
    # Nonexistent user
    res_user = client.post("/api/bookings", json={"userId": 99, "showId": 1, "seatIds": [1]})
    assert res_user.status_code == 404

    # Nonexistent show
    res_show = client.post("/api/bookings", json={"userId": 1, "showId": 99, "seatIds": [1]})
    assert res_show.status_code == 404

    # Invalid seat ID
    res_seat = client.post("/api/bookings", json={"userId": 1, "showId": 1, "seatIds": [999]})
    assert res_seat.status_code == 400
