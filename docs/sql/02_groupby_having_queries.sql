-- 02_GROUPBY_HAVING_QUERIES
-- Demonstrates Aggregate functions, GROUP BY, and HAVING filtering

-- 1. Total revenue per movie where total revenue exceeds $100.00
SELECT 
    m.title AS movie_title,
    COUNT(DISTINCT b.id) AS total_bookings,
    SUM(b.total_amount) AS total_revenue
FROM movies m
JOIN shows sh ON m.id = sh.movie_id
JOIN bookings b ON sh.id = b.show_id
WHERE b.status = 'CONFIRMED'
GROUP BY m.id, m.title
HAVING SUM(b.total_amount) > 100.00
ORDER BY total_revenue DESC;

-- 2. Screens with more than 3 shows scheduled
SELECT 
    t.name AS theater_name,
    s.name AS screen_name,
    COUNT(sh.id) AS show_count
FROM screens s
JOIN theaters t ON s.theater_id = t.id
JOIN shows sh ON s.id = sh.screen_id
GROUP BY t.name, s.name, s.id
HAVING COUNT(sh.id) >= 2;
