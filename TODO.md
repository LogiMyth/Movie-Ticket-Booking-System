# TODO.md — Project Roadmap & Task Queue

## Completed Tasks
- [x] Replaced Java / Spring Boot / Maven backend completely with Python / FastAPI / SQLAlchemy / Alembic.
- [x] Preserved MySQL database schema with `booking_seats.show_id` and `UNIQUE(show_id, seat_id)`.
- [x] Recreated all REST API endpoints matching exact JSON contracts on `http://localhost:8000/api`.
- [x] Preserved React frontend, CinéPulse UI, SeatMatrix 2D array, and BookingQueue FIFO implementation.
- [x] Passed pytest suite and `npm run build`.
- [x] Removed all Java files (`pom.xml`, `src/`, `target/`).
- [x] Updated project documentation (`README.md`, `AGENTS.md`, `API.md`, `DSA-Writeup.md`, `ER-DIAGRAM.md`, `PROJECT_STATUS.md`, `DECISIONS.md`).
