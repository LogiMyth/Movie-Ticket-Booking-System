# CinéPulse Movie Ticket Booking System — Entity-Relationship (ER) Diagram

## 1. Overview
This document specifies the relational database schema for the CinéPulse Movie Ticket Booking System.

---

## 2. Mermaid ER Diagram

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : "places (1:N)"
    MOVIES ||--o{ SHOWS : "featured in (1:N)"
    THEATERS ||--o{ SCREENS : "contains (1:N)"
    SCREENS ||--o{ SEATS : "has physical (1:N)"
    SCREENS ||--o{ SHOWS : "hosts (1:N)"
    SHOWS ||--o{ BOOKINGS : "booked for (1:N)"
    SHOWS ||--o{ BOOKING_SEATS : "scope (1:N)"
    BOOKINGS ||--|{ BOOKING_SEATS : "includes (1:N)"
    SEATS ||--o{ BOOKING_SEATS : "reserved in (1:N)"

    USERS {
        bigint id PK
        string name
        string email UK
        string password
        timestamp created_at
    }

    MOVIES {
        bigint id PK
        string title
        text description
        string genre
        int duration_minutes
        string language
        date release_date
        string poster_url
    }

    THEATERS {
        bigint id PK
        string name
        string location
    }

    SCREENS {
        bigint id PK
        bigint theater_id FK
        string name
        int total_rows
        int total_columns
    }

    SEATS {
        bigint id PK
        bigint screen_id FK
        string row_label
        int seat_number
        string seat_type
    }

    SHOWS {
        bigint id PK
        bigint movie_id FK
        bigint screen_id FK
        date show_date
        time show_time
        decimal price
    }

    BOOKINGS {
        bigint id PK
        bigint user_id FK
        bigint show_id FK
        string booking_reference UK
        string status
        decimal total_amount
        timestamp booked_at
    }

    BOOKING_SEATS {
        bigint id PK
        bigint booking_id FK
        bigint show_id FK
        bigint seat_id FK
        decimal price
    }
```

---

## 3. Entity & Cardinality Summary

| Entity | Primary Key | Foreign Keys | Key Relationships |
|--------|-------------|--------------|-------------------|
| `users` | `id` | None | $1:N$ to `bookings` |
| `movies` | `id` | None | $1:N$ to `shows` |
| `theaters` | `id` | None | $1:N$ to `screens` |
| `screens` | `id` | `theater_id` | $1:N$ to `seats`, $1:N$ to `shows` |
| `seats` | `id` | `screen_id` | Physical seat template per screen |
| `shows` | `id` | `movie_id`, `screen_id` | Links Movie + Screen + Showtime |
| `bookings` | `id` | `user_id`, `show_id` | $1:N$ to `booking_seats` |
| `booking_seats` | `id` | `booking_id`, `show_id`, `seat_id` | Junction table enforcing show-specific unique seat reservation |

> **Key Design Guarantee**: Physical seats belong to a `screen`. Availability depends on the `show`. Unique constraint `uk_show_seat_unique` on `(show_id, seat_id)` prevents double-booking across any booking for the same show.
