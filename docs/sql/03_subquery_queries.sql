-- 03_SUBQUERY_QUERIES
-- Demonstrates Subqueries (Scalar, Correlated, IN / EXISTS)

-- 1. Subquery: Find movies whose average show price is higher than the overall average show price across all movies
SELECT 
    m.title,
    m.genre,
    AVG(sh.price) AS avg_movie_show_price
FROM movies m
JOIN shows sh ON m.id = sh.movie_id
GROUP BY m.id, m.title, m.genre
HAVING AVG(sh.price) > (
    SELECT AVG(price) FROM shows
);

-- 2. Correlated Subquery: Find users who have booked more tickets than the average user booking count
SELECT 
    u.id,
    u.name,
    u.email,
    (SELECT COUNT(*) FROM bookings b WHERE b.user_id = u.id) AS user_booking_count
FROM users u
WHERE (SELECT COUNT(*) FROM bookings b WHERE b.user_id = u.id) > 0;
