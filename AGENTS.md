# AGENTS.md — Development Guidelines & Environment Configuration

## System Environment
- **OS**: Windows 11
- **Python Version**: Python 3.11+
- **Node.js**: Installed (`npm` available)
- **Frontend Stack**: React 19, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), React Router DOM v7
- **Backend Stack**: Python 3.11+, FastAPI, Uvicorn, SQLAlchemy 2.x, Alembic, Pydantic v2, PyMySQL, pytest

## Guidelines for Agents
1. **Frontend Isolation**: Do not alter frontend styling or DSA logic in `movie-ticket-booking/`. Run `npm run build` from `movie-ticket-booking/` to verify.
2. **Backend Execution**: Run `pytest` from `backend/` to verify backend functionality.
