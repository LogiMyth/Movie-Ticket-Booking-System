-- 01_JOIN_QUERIES
-- Demonstrates SQL JOINs across Movies, Theaters, Screens, Shows, and Bookings

-- 1. Inner Join: Retrieve full showtime schedule with Movie, Theater, and Screen details
SELECT 
    m.title AS movie_title,
    m.genre AS movie_genre,
    t.name AS theater_name,
    s.name AS screen_name,
    sh.show_date,
    sh.show_time,
    sh.price
FROM shows sh
INNER JOIN movies m ON sh.movie_id = m.id
INNER JOIN screens s ON sh.screen_id = s.id
INNER JOIN theaters t ON s.theater_id = t.id
ORDER BY sh.show_date, sh.show_time;

-- 2. Left Join: List all bookings with customer details and reserved seat count
SELECT 
    b.booking_reference,
    u.name AS customer_name,
    m.title AS movie_title,
    sh.show_date,
    sh.show_time,
    COUNT(bs.seat_id) AS total_seats_reserved,
    b.total_amount,
    b.status
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN shows sh ON b.show_id = sh.id
JOIN movies m ON sh.movie_id = m.id
LEFT JOIN booking_seats bs ON b.id = bs.booking_id
GROUP BY b.id, b.booking_reference, u.name, m.title, sh.show_date, sh.show_time, b.total_amount, b.status;
