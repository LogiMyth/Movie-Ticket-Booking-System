# CinéPulse Movie Ticket Booking System — Data Structures & Algorithms (DSA) Specification

## Executive Summary
This document details the Data Structures & Algorithms (DSA) implemented in **CinéPulse**.

The system combines:
1. **Frontend Interactive DSA Demonstration**:
   - **2D Matrix (Seat Allocation)**
   - **FIFO Linked-List Queue (Booking Request Processing)**
2. **Backend Authoritative Persistence**:
   - **FastAPI / SQLAlchemy / MySQL Database Validation & Unique Constraint Enforcement**

---

## 1. 2D Array / Matrix (Cinema Seat Allocation)

### Why 2D Matrix is Suitable
A cinema auditorium is physically arranged in rows and columns. A 2D Matrix (Array of Arrays) maps 1-to-1 to physical theatre seats, providing intuitive spatial visualization and instant indexed access.

### Rows, Columns, and Coordinates
- **Rows**: Represented by row indices (e.g., Index 0 = Row A, Index 4 = Row E).
- **Columns**: Represented by column indices (e.g., Index 0 = Seat 1, Index 13 = Seat 14).
- **Coordinate System**: Any seat is uniquely identified by `(row_idx, col_idx)`.

### Seat States
- `AVAILABLE` (`0` / `true`): Open for reservation.
- `BOOKED` (`1` / `false`): Occupied or confirmed by a prior booking.
- `SELECTED` (`2`): Temporarily highlighted by user in current session.

### Complexity & Algorithms
- **Direct Seat Access / Toggle**: $O(1)$ constant time lookup by matrix index.
- **Consecutive Seat Allocation Search**: $O(R \times C)$ using a sliding window across rows to find contiguous available seats for group bookings.

---

## 2. FIFO Queue (Booking Request Processing)

### Why Queue is Suitable
When multiple users attempt to reserve seats concurrently, a First-In-First-Out (FIFO) queue guarantees fair order of request processing without race conditions or starvation.

### FIFO Behavior
- **Enqueue**: Appends new incoming booking request to the **rear (tail)** of the queue.
- **Dequeue**: Processes and removes the oldest pending request from the **front (head)** of the queue.

### Algorithmic Complexity
- **Enqueue (Tail insertion)**: $O(1)$
- **Dequeue (Head removal)**: $O(1)$
- **Peek**: $O(1)$
- **Queue Traversal**: $O(N)$ for UI queue position rendering.

---

## 3. Frontend DSA vs Backend Authoritative Validation

| Aspect | Frontend (React / JS DSA) | Backend (FastAPI / MySQL DB) |
|--------|--------------------------|-----------------------------|
| **Primary Role** | Interactive UI state & DSA concept demonstration | Authoritative transactional persistence & seat locking |
| **Data Structure** | 2D Array (`SeatMatrix`) & Linked List (`BookingQueue`) | Relational SQL tables (`shows`, `seats`, `booking_seats`) |
| **Concurrency Guard** | Visual processing queue & local state guard | Transaction isolation & composite DB constraint `UNIQUE(show_id, seat_id)` |
| **State Lifespan** | Transient session state | Persistent database storage |

---

## 4. Key Takeaways
- The **2D Matrix** allows $O(1)$ seat manipulation matching cinema layout geometry.
- The **FIFO Queue** guarantees $O(1)$ fair request queuing.
- The **Backend Database** enforces persistent double-booking prevention per show.
