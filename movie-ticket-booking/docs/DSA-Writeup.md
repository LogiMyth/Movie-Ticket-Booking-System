# CinéPulse Movie Ticket Booking System — Phase 1 Technical Writeup & DSA Specification

## Executive Summary
This document details the architecture, design choices, and Data Structures & Algorithms (DSA) implemented in **Phase 1** of the **CinéPulse Movie Ticket Booking System**.

Phase 1 focuses on building a state-of-the-art React frontend inspired by Google Stitch designs, combined with robust frontend-side DSA logic for:
1. **2D Seat Allocation Matrix** (Seat Management)
2. **Linked-List FIFO Booking Queue** (Request Processing)

---

## 1. Data Structure 1: 2D Matrix (Seat Allocation)

### Implementation (`src/dsa/SeatMatrix.js`)
The cinema hall is represented as a **10 Row × 14 Column 2D Array** ($10 \times 14 = 140$ seats total).

#### Matrix Representation & States
- **0 = AVAILABLE**: Open for selection
- **1 = BOOKED**: Occupied/Reserved
- **2 = SELECTED**: Highlighted by user in current session

#### Seat Tiers & Pricing Logic
- **Rows A–C**: Standard Tier ($18.50)
- **Rows D–H**: Premium Tier ($22.00)
- **Rows I–J**: VIP Tier ($32.00)

#### Algorithmic Highlights
- **Direct $O(1)$ Access**: Lookup or toggle seat state by matrix coordinate $(r, c)$.
- **Sliding Window Consecutive Seat Finder ($O(R \times C)$)**: 
  Searches for $N$ consecutive available seats in a single row for group bookings, prioritizing center rows and middle columns.

---

## 2. Data Structure 2: FIFO Linked-List Queue (Request Processing)

### Implementation (`src/dsa/BookingQueue.js`)
Handles incoming booking requests using a **First-In-First-Out (FIFO) Linked List**.

#### Queue Operations
- **Enqueue ($O(1)$)**: Appends new booking request to the tail of the linked list.
- **Dequeue ($O(1)$)**: Removes and returns the front request at the head of the linked list for processing.
- **Peek ($O(1)$)**: Reads current head without mutating queue state.
- **toArray ($O(N)$)**: Renders live visual representation of queue positions for user transparency.

---

## 3. Stitch Screen Conversions Completed

| Screen # | Stitch Screen Name | React Component Path | Key Visual / Functional Features |
| font-mono |-------------------|---------------------|--------------------------------|
| 1 | Home / Movie Listing | `src/pages/Home.jsx` | Fixed header, hero banner, category pill filters, 4-col movie grid |
| 2 | Movie Details | `src/pages/MovieDetails.jsx` | Movie synopsis, cast, rating pills, date picker, showtime selector |
| 3 | Seat Selection | `src/pages/SeatSelection.jsx` | Screen arc SVG, 10x14 matrix with 3 aisles, seat legend, booking sidebar |
| 4 | Booking Queue | `src/pages/BookingQueue.jsx` | Processing card with progress bar, linked list waiting queue visualizer |
| 5 | Confirmation | `src/pages/BookingConfirmation.jsx` | Premium digital pass, QR code mockup, ticket breakdown |

---

## 4. Verification & Testing

- **Build Status**: Passed cleanly (`npm run build` completed in ~377ms, zero warnings/errors).
- **Styling**: Configured with Tailwind CSS v4 `@theme` directive in `src/index.css` using custom CinéPulse cinematic color palette.
