# DECISIONS.md — Architectural & Technical Decisions Log

## Decision 1: Backend Directory Structure
- **Choice**: Separated into `backend/` at root level.
- **Rationale**: Keeps React/Vite frontend (`movie-ticket-booking/`) completely independent while establishing clean Spring Boot Maven structure.

## Decision 2: Flyway Database Migrations
- **Choice**: Enabled Flyway migrations in `src/main/resources/db/migration/`.
- **Rationale**: Provides deterministic database schema creation (`V1__initial_schema.sql`) and testing seed data (`V2__seed_data.sql`).

## Decision 3: Seat Availability per Show Design
- **Choice**: Physical seats belong to `screens`. Booking availability is tracked per `shows` through `bookings` $\rightarrow$ `booking_seats`.
- **Rationale**: Ensures physical seats are static per screen while allowing different bookings for different showtimes. Added `uk_booking_seat_unique` constraint to prevent double-booking.
