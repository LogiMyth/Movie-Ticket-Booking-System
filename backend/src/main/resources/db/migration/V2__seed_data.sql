-- Update seed V2 insert to include show_id in booking_seats
-- V2__seed_data.sql

-- Seed User
INSERT INTO users (id, name, email, password) VALUES 
(1, 'Alex Mercer', 'alex.mercer@example.com', '$2a$10$e8w20.q57QY765E4f8q7sO1s8d.95u1Wp9J8t7r6e5w4q3e2r1t0y');

-- Seed Movies
INSERT INTO movies (id, title, description, genre, duration_minutes, language, release_date, poster_url) VALUES 
(1, 'Dune: Part Three', 'Paul Atreides faces the cosmic consequences of his holy war across the known universe as new galactic threats emerge.', 'Sci-Fi, Adventure', 165, 'English', '2026-11-20', 'https://images.unsplash.com/photo-1534447677768-be436bb09401'),
(2, 'Interstellar: 12th Anniversary', 'A team of ex-NASA pilots travel through a wormhole near Saturn in search of a new home for humanity.', 'Sci-Fi, Drama', 169, 'English', '2014-11-07', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa');

-- Seed Theater
INSERT INTO theaters (id, name, location) VALUES 
(1, 'CinéPulse Grand Dolby', 'Downtown Cinema Center, Hall 1');

-- Seed Screen
INSERT INTO screens (id, theater_id, name, total_rows, total_columns) VALUES 
(1, 1, 'Screen 1 - Grand IMAX', 10, 14);

-- Seed Seats for Screen 1 (Standard Row A, Premium Row E, VIP Row I)
INSERT INTO seats (id, screen_id, row_label, seat_number, seat_type) VALUES 
(1, 1, 'A', 1, 'STANDARD'),
(2, 1, 'A', 2, 'STANDARD'),
(3, 1, 'E', 5, 'PREMIUM'),
(4, 1, 'E', 6, 'PREMIUM'),
(5, 1, 'I', 10, 'VIP');

-- Seed Shows
INSERT INTO shows (id, movie_id, screen_id, show_date, show_time, price) VALUES 
(1, 1, 1, '2026-09-10', '18:00:00', 22.00),
(2, 2, 1, '2026-09-10', '21:30:00', 18.50);
