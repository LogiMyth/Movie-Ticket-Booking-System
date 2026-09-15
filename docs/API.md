# CinéPulse Movie Ticket Booking System — REST API Specification

## Base URL
`http://localhost:8000/api`

---

## Architecture Note
- **Frontend 2D Seat Matrix & FIFO Queue**: Interactive UI and Data Structures & Algorithms (DSA) demonstration in React.
- **Backend Python FastAPI & MySQL Database**: Authoritative source of truth for seat availability and transactional booking execution using SQLAlchemy.

---

## Endpoints Summary

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| `GET` | `/api/health` | System health check | `200 OK` |
| `GET` | `/api/movies` | Get list of all movies | `200 OK` |
| `GET` | `/api/movies/{id}` | Get single movie details by ID | `200 OK` / `404 Not Found` |
| `GET` | `/api/movies/{id}/shows` | Get all showtimes for a movie | `200 OK` / `404 Not Found` |
| `GET` | `/api/shows/{id}` | Get show details by ID | `200 OK` / `404 Not Found` |
| `GET` | `/api/shows/{id}/seats` | Get seat map & availability for a specific show | `200 OK` / `404 Not Found` |
| `POST` | `/api/bookings` | Execute transactional multi-seat booking for a show | `201 Created` / `400 Bad Request` / `409 Conflict` |
| `GET` | `/api/bookings/{id}` | Get booking details by ID | `200 OK` / `404 Not Found` |
| `GET` | `/api/bookings/reference/{reference}` | Get booking details by reference (e.g., `CP-A1B2C3D4`) | `200 OK` / `404 Not Found` |

---

## Detailed Endpoint Contracts

### 1. GET `/api/shows/{id}/seats`
Returns physical seats for the screen hosting the show, with `available` calculated specifically for `showId`.

#### Example Response (`200 OK`):
```json
[
  {
    "id": 1,
    "rowLabel": "A",
    "seatNumber": 1,
    "seatType": "STANDARD",
    "price": 22.00,
    "available": true
  },
  {
    "id": 2,
    "rowLabel": "A",
    "seatNumber": 2,
    "seatType": "STANDARD",
    "price": 22.00,
    "available": false
  }
]
```

---

### 2. POST `/api/bookings`
Executes an atomic transactional booking.

#### Example Request:
```json
{
  "userId": 1,
  "showId": 1,
  "seatIds": [1, 2]
}
```

#### Example Response (`201 Created`):
```json
{
  "bookingId": 1,
  "bookingReference": "CP-B482A9C1",
  "status": "CONFIRMED",
  "movieTitle": "Dune: Part Three",
  "theaterName": "CinéPulse Grand Dolby",
  "screenName": "Screen 1 - Grand IMAX",
  "showDate": "2026-09-10",
  "showTime": "18:00:00",
  "seats": ["A1", "A2"],
  "totalAmount": 44.00,
  "bookedAt": "2026-09-09T02:30:00"
}
```

#### Double-Booking / Conflict Response (`409 Conflict`):
```json
{
  "detail": "Seat A1 is already booked for this show."
}
```
