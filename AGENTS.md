# AGENTS.md — Development Guidelines & Environment Configuration

## System Environment
- **OS**: Windows 11
- **Java Version**: Java 21 / 25
- **Maven Path**: `C:\Program Files\JetBrains\IntelliJ IDEA 2026.1.3\plugins\maven\lib\maven3\bin\mvn.cmd`
- **Node.js**: Installed (`npm` available)
- **Frontend Stack**: React 19, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), React Router DOM v7
- **Backend Stack**: Spring Boot 3.4.3, Spring Data JPA, Flyway Migration, MySQL / H2

## Guidelines for Agents
1. **Frontend Isolation**: Do not alter frontend styling or DSA logic in `movie-ticket-booking/`. Run `npm run build` from `movie-ticket-booking/` to verify.
2. **Backend Execution**: Run `mvn clean test` from `backend/` using the specified Maven executable path.
