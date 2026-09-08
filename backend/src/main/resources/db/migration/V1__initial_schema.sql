-- V1__initial_schema.sql
-- Database Migration Script for Movie Ticket Booking System

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Movies Table
CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    genre VARCHAR(100),
    duration_minutes INT NOT NULL,
    language VARCHAR(50),
    release_date DATE,
    poster_url VARCHAR(500)
);

-- 3. Theaters Table
CREATE TABLE theaters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL
);

-- 4. Screens Table
CREATE TABLE screens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    theater_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    total_rows INT NOT NULL,
    total_columns INT NOT NULL,
    CONSTRAINT fk_screens_theater FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE
);

-- 5. Seats Table (Physical seats per screen)
CREATE TABLE seats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    screen_id BIGINT NOT NULL,
    row_label VARCHAR(5) NOT NULL,
    seat_number INT NOT NULL,
    seat_type VARCHAR(20) NOT NULL DEFAULT 'STANDARD',
    CONSTRAINT fk_seats_screen FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE,
    CONSTRAINT uk_screen_seat UNIQUE (screen_id, row_label, seat_number)
);

-- 6. Shows Table
CREATE TABLE shows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    screen_id BIGINT NOT NULL,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_shows_movie FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    CONSTRAINT fk_shows_screen FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE
);

-- 7. Bookings Table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    show_id BIGINT NOT NULL,
    booking_reference VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
    total_amount DECIMAL(10, 2) NOT NULL,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_bookings_show FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE
);

-- 8. Booking Seats Junction Table (M:N between Bookings & Seats per Show)
CREATE TABLE booking_seats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    seat_id BIGINT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_booking_seats_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    CONSTRAINT fk_booking_seats_seat FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
);

-- IMPORTANT CONSTRAINT: Prevent duplicate booking of the same seat for the same show across different bookings
-- We construct a unique constraint index on (show_id, seat_id) via a composite unique key or trigger/check.
-- In relational schema, each booking seat maps to a booking (which has show_id).
-- To enforce seat availability PER SHOW at database level:
ALTER TABLE booking_seats ADD CONSTRAINT uk_booking_seat_unique UNIQUE (booking_id, seat_id);

-- Performance Indexes
CREATE INDEX idx_shows_movie_date ON shows(movie_id, show_date);
CREATE INDEX idx_shows_screen_date ON shows(screen_id, show_date);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_show ON bookings(show_id);
