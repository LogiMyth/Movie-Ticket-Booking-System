# DECISIONS.md — Architectural & Technical Decisions Log

## Decision 1: Backend Directory Structure
- **Choice**: Separated into `backend/` at root level.
- **Rationale**: Keeps React/Vite frontend (`movie-ticket-booking/`) completely independent while establishing clean Spring Boot Maven structure.

## Decision 2: Flyway Database Migrations
- **Choice**: Enabled Flyway migrations in `src/main/resources/db/migration/`.
- **Rationale**: Provides deterministic database schema creation (`V1__initial_schema.sql`), testing seed data (`V2__seed_data.sql`), and schema adjustments (`V3__booking_seat_show_constraint.sql`).

## Decision 3: Show-Specific Composite Unique Constraint on Seats
- **Choice**: Added `show_id` to `booking_seats` and applied composite constraint `uk_show_seat_unique UNIQUE(show_id, seat_id)`.
- **Rationale**: A constraint on `(booking_id, seat_id)` allowed duplicate bookings of the same seat across different bookings for the same show. The composite `(show_id, seat_id)` constraint guarantees double-booking prevention at the database level while allowing the same physical seat to be booked for different shows.

## Decision 4: Architecture Responsibility Separation
- **Choice**: Frontend React `SeatMatrix` (2D Array) and `BookingQueue` (Linked List) handle interactive UI and college DSA demonstration. Backend Spring Boot `@Transactional` Booking Service and MySQL DB act as the authoritative source of truth for seat reservation and data persistence.
