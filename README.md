# CinéPulse – Movie Ticket Booking System

A college project demonstrating **Data Structures & Algorithms (2D Array & Linked-List FIFO Queue)** alongside a full-stack **React + Python (FastAPI) + SQLAlchemy + MySQL** architecture.

---

## 🌟 Features

- **Movie Catalog & Showtime Selection**: Browse premier movies and live showtimes.
- **2D Seat Matrix Allocation Engine**: Interactive $10 \times 14$ seat matrix with aisle gaps, seat tier pricing (Standard, Premium, VIP), and auto-selection of $N$ adjoining seats via a sliding window algorithm.
- **FIFO Booking Queue Visualizer**: Linked-list FIFO queue processing booking requests in strict order of submission.
- **Show-Specific Seat Availability**: Database-backed availability calculated per showtime.
- **Transactional Booking & Double-Booking Protection**: Atomic FastAPI backend execution with composite `UNIQUE (show_id, seat_id)` database constraints preventing double bookings.
- **REST API & Data Persistence**: Complete FastAPI REST backend with SQLAlchemy 2.x ORM, Alembic migrations, and Pydantic validation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router DOM v7

### Backend
- **Framework**: Python 3.11+ / FastAPI
- **ASGI Server**: Uvicorn
- **ORM & Migrations**: SQLAlchemy 2.x & Alembic
- **Driver**: PyMySQL
- **Validation**: Pydantic v2
- **Testing**: pytest & httpx

### Database
- **Database**: MySQL 8.0+

### Data Structures & Algorithms (DSA)
- **2D Array / Matrix**: Cinema seat map state tracking & $O(R \times C)$ sliding window consecutive seat search algorithm.
- **Linked-List Queue**: $O(1)$ FIFO request queue (`enqueue` / `dequeue`).

---

## 📁 Project Structure

```text
Movie Ticket Booking System/
├── movie-ticket-booking/       # React 19 Frontend (Vite + Tailwind CSS v4)
├── backend/                    # Python FastAPI Backend (SQLAlchemy + Alembic)
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── services/
│   ├── alembic/
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── .env.example
│   └── tests/
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
- **Python**: 3.11+
- **MySQL Server**: v8.0+

---

## ⚙️ Setup Instructions

### 1. Database Setup (MySQL)

Create the MySQL database:
```sql
CREATE DATABASE cinepulse;
```

---

### 2. Backend Setup (FastAPI)

Navigate to the `backend/` directory:
```bash
cd backend
```

Create and activate a virtual environment:
- **Windows**:
  ```cmd
  python -m venv .venv
  .venv\Scripts\activate
  ```
- **Linux/macOS**:
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

Install dependencies:
```bash
pip install -r requirements.txt
```

Configure environment variables (create `.env` from `.env.example`):
```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/cinepulse
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Run Alembic database migrations:
```bash
alembic upgrade head
```

Run the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```
The FastAPI backend REST API will be available at `http://localhost:8000/api`.  
Interactive API docs are available at `http://localhost:8000/docs`.

Run backend unit & integration tests:
```bash
pytest
```

---

### 3. Frontend Setup (React + Vite)

Navigate to the `movie-ticket-booking/` directory:
```bash
cd movie-ticket-booking
```

Install packages and start the dev server:
```bash
npm install
npm run dev
```
The frontend application will start at `http://localhost:5173`.

Build frontend production bundle:
```bash
npm run build
```

---

## 🧠 DSA Concept Justification

1. **2D Matrix $\rightarrow$ Cinema Seat Allocation**:
   - Represents the physical hall grid ($10 \times 14$). Provides instant $O(1)$ coordinate lookup and powers an $O(R \times C)$ sliding window algorithm to auto-assign consecutive seats.
2. **Linked-List Queue $\rightarrow$ FIFO Booking Processing**:
   - Maintains fairness during high-demand surges by processing reservations strictly in the order received ($O(1)$ enqueue and dequeue operations).
