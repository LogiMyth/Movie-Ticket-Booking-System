# DECISIONS.md — Architectural & Technical Decisions Log

## Decision 1: Complete Backend Migration to Python FastAPI
- **Choice**: Replaced Java/Spring Boot backend with Python 3.11+ / FastAPI / SQLAlchemy 2.x / Alembic in `backend/`.
- **Rationale**: Meets project migration requirement while maintaining zero UI/UX changes on the React frontend.

## Decision 2: Alembic Database Migrations
- **Choice**: Implemented Alembic migrations (`alembic/versions/001_initial_schema_and_seed.py`).
- **Rationale**: Replaces Flyway migration scripts with Python-native Alembic migration management for MySQL schema creation and seed data insertion.

## Decision 3: Show-Specific Composite Unique Constraint on Seats
- **Choice**: Maintained `show_id` on `booking_seats` and enforced composite constraint `UNIQUE(show_id, seat_id)`.
- **Rationale**: Prevents double booking of the same seat for the same show at the database level while allowing the same physical seat to be reserved for different shows.

## Decision 4: Pydantic v2 CamelCase Schema Serialization
- **Choice**: Configured Pydantic schemas with `alias_generator=to_camel` and `serialize_by_alias=True`.
- **Rationale**: Preserves 100% exact REST API response contracts expected by the React frontend (e.g. `durationMinutes`, `movieTitle`, `rowLabel`, `totalAmount`) without requiring frontend DTO parsing modifications.
