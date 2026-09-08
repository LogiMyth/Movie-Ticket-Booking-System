-- V3__booking_seat_show_constraint.sql
-- Add show_id to booking_seats and construct composite UNIQUE (show_id, seat_id) constraint
-- to prevent duplicate booking of the exact same physical seat for the exact same show at DB level.

-- 1. Drop old constraint on (booking_id, seat_id)
ALTER TABLE booking_seats DROP CONSTRAINT uk_booking_seat_unique;

-- 2. Add show_id column to booking_seats
ALTER TABLE booking_seats ADD COLUMN show_id BIGINT NOT NULL;

-- 3. Add FK constraint for show_id
ALTER TABLE booking_seats ADD CONSTRAINT fk_booking_seats_show FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE;

-- 4. Add composite UNIQUE constraint on (show_id, seat_id)
ALTER TABLE booking_seats ADD CONSTRAINT uk_show_seat_unique UNIQUE (show_id, seat_id);
