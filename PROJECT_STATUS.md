# PROJECT_STATUS.md

## Current Status: PHASE 2 — CHECKPOINT 2 COMPLETE

### Completed Work
1. **Phase 1 Frontend & DSA Engine** (Verified):
   - React 19 + Vite + Tailwind CSS v4 frontend.
   - 2D Seat Allocation Matrix ($10 \times 14$) with sliding window consecutive seat search algorithm.
   - Linked-List FIFO Booking Queue request processing engine.
   - All 5 Stitch screens converted and operational.

2. **Phase 2 Checkpoint 1 Backend Foundation & Database Schema** (Completed):
   - Spring Boot 3.4.3 Maven project structure in `backend/`.
   - Core MySQL schema with Flyway migrations (`V1__initial_schema.sql`, `V2__seed_data.sql`).

3. **Phase 2 Checkpoint 2 REST APIs + Transactional Booking Logic** (Completed):
   - **Schema Correction Migration (`V3__booking_seat_show_constraint.sql`)**: Added `show_id` to `booking_seats` with composite `UNIQUE (show_id, seat_id)` constraint to enforce show-specific seat availability at database level.
   - **REST Controllers**:
     - `MovieController`: `GET /api/movies`, `GET /api/movies/{id}`, `GET /api/movies/{id}/shows`
     - `ShowController`: `GET /api/shows/{id}`, `GET /api/shows/{id}/seats`
     - `BookingController`: `POST /api/bookings`, `GET /api/bookings/{id}`, `GET /api/bookings/reference/{reference}`
   - **Show-Specific Availability**: Seat booking availability calculated specifically for `showId`. Seat A1 booked for Show 1 remains available for Show 2.
   - **Atomic Transactional Booking (`@Transactional`)**: Validates user, show, seat-screen matching, and seat availability; generates unique reference (`CP-XXXXXXXX`), computes totals, and rolls back atomically on conflict.
   - **Error Handling**: Global `@RestControllerAdvice` returning structured JSON error payloads (`409 CONFLICT` for double bookings, `400 BAD REQUEST`, `404 NOT FOUND`).
   - **CORS Configuration**: Configured `WebMvcConfigurer` allowing `http://localhost:5173`.
   - **Frontend Integration**: Connected `BookingContext.jsx` to fetch live movies from backend with graceful fallback.
   - **Testing**: Added `BookingServiceTest` proving show-specific seat availability, duplicate booking rejection, atomic rollback, and valid seat checks ($6/6$ tests passing).
