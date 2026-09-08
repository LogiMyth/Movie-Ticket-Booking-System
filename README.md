# Movie Ticket Booking System (CinéPulse)

A college project demonstrating **Data Structures & Algorithms (2D Array & Linked-List FIFO Queue)** alongside a full-stack **Spring Boot + React + MySQL** architecture.

---

## 🌟 Features

- **Movie Catalog & Showtime Selection**: Browse premier movies and live showtimes.
- **2D Seat Matrix Allocation Engine**: Interactive $10 \times 14$ seat matrix with aisle gaps, seat tier pricing (Standard, Premium, VIP), and auto-selection of $N$ adjoining seats via a sliding window algorithm.
- **FIFO Booking Queue Visualizer**: Linked-list FIFO queue processing booking requests in strict order of submission.
- **Show-Specific Seat Availability**: Database-backed availability calculated per showtime.
- **Transactional Booking & Double-Booking Protection**: Atomic `@Transactional` backend execution with composite `UNIQUE (show_id, seat_id)` database constraints preventing double bookings.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router DOM v7

### Backend
- **Framework**: Java 21/25 + Spring Boot 3.4.3
- **Data Access**: Spring Data JPA + Hibernate
- **Database**: MySQL 8.0+ / H2 In-Memory (for testing)
- **Migrations**: Flyway Migration

### Data Structures & Algorithms (DSA)
- **2D Array / Matrix**: Cinema seat map state tracking & $O(R \times C)$ sliding window consecutive seat search algorithm.
- **Linked-List Queue**: $O(1)$ FIFO request queue (`enqueue` / `dequeue`).

---

## 📁 Project Structure

```text
Movie Ticket Booking System/
├── movie-ticket-booking/       # React 19 Frontend (Vite + Tailwind CSS v4)
├── backend/                    # Spring Boot 3.4.3 Maven Backend
└── docs/                       # Project Documentation & SQL Assignment Files
    ├── API.md                  # REST API Specification
    ├── DSA-Writeup.md          # College DSA Analysis & Algorithm Details
    ├── ER-DIAGRAM.md           # Database ER Diagram (Mermaid)
    └── sql/                    # SQL Assignment Query Scripts
        ├── 01_join_queries.sql
        ├── 02_groupby_having_queries.sql
        └── 03_subquery_queries.sql
```

---

## 📋 System Requirements

- **Node.js**: v18.0.0 or higher
- **Java JDK**: JDK 21 or JDK 25
- **Maven**: Bundled or installed (`mvn` / `mvn.cmd`)
- **MySQL Server**: v8.0+ (Optional for local testing; tests run automatically on H2)

---

## 🚀 Running the Frontend

```bash
cd movie-ticket-booking
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

---

## ⚙️ Running the Backend

```bash
cd backend
mvn spring-boot:run
```
Or run test suite:
```bash
mvn clean test
```
The backend REST API will run at `http://localhost:8080/api`.

---

## 🗄️ Database Setup

1. Create MySQL database:
   ```sql
   CREATE DATABASE movie_ticket_booking;
   ```
2. Configure environment variables (or rely on defaults):
   - `DB_HOST` (default: `localhost`)
   - `DB_PORT` (default: `3306`)
   - `DB_NAME` (default: `movie_ticket_booking`)
   - `DB_USERNAME` (default: `root`)
   - `DB_PASSWORD` (default: `root`)
3. Launching Spring Boot automatically runs Flyway migrations (`V1__initial_schema.sql`, `V2__seed_data.sql`, `V3__booking_seat_show_constraint.sql`).

---

## 🧠 DSA Concept Justification

1. **2D Matrix $\rightarrow$ Cinema Seat Allocation**:
   - Represents the physical hall grid ($10 \times 14$). Provides instant $O(1)$ coordinate lookup and powers an $O(R \times C)$ sliding window algorithm to auto-assign consecutive seats.
2. **Linked-List Queue $\rightarrow$ FIFO Booking Processing**:
   - Maintains fairness during high-demand surges by processing reservations strictly in the order received ($O(1)$ enqueue and dequeue operations).
