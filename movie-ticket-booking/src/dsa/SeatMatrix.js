/**
 * SeatMatrix - 2D Matrix DSA Implementation for Cinema Seat Allocation
 * 
 * Matrix representation: 10 Rows (A-J) x 14 Columns (1-14)
 * Seat States:
 * 0 = AVAILABLE
 * 1 = BOOKED (Occupied)
 * 2 = SELECTED (Currently selected by user in session)
 * 
 * Seat Tiers:
 * Row A-C: Standard ($18.50)
 * Row D-H: Premium ($22.00)
 * Row I-J: VIP ($32.00)
 */

export const SEAT_STATES = {
  AVAILABLE: 0,
  BOOKED: 1,
  SELECTED: 2,
};

export const ROW_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const TIER_CONFIG = {
  STANDARD: { rows: ['A', 'B', 'C'], name: 'Standard', price: 18.50, color: 'border-slate-600' },
  PREMIUM: { rows: ['D', 'E', 'F', 'G', 'H'], name: 'Premium', price: 22.00, color: 'border-amber-600/40' },
  VIP: { rows: ['I', 'J'], name: 'VIP', price: 32.00, color: 'border-gold-500/60' },
};

export class SeatMatrix {
  constructor(rows = 10, cols = 14) {
    this.rows = rows;
    this.cols = cols;
    // Initialize 2D Array [rows][cols] with 0 (AVAILABLE)
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(SEAT_STATES.AVAILABLE));
  }

  static getSeatTier(rowIndex) {
    const rowLabel = ROW_LABELS[rowIndex];
    if (TIER_CONFIG.VIP.rows.includes(rowLabel)) return TIER_CONFIG.VIP;
    if (TIER_CONFIG.PREMIUM.rows.includes(rowLabel)) return TIER_CONFIG.PREMIUM;
    return TIER_CONFIG.STANDARD;
  }

  static getSeatPrice(rowIndex) {
    return SeatMatrix.getSeatTier(rowIndex).price;
  }

  // Pre-book random seats for initial state simulation
  seedBookedSeats(bookedList = []) {
    if (bookedList.length > 0) {
      bookedList.forEach(({ r, c }) => {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          this.grid[r][c] = SEAT_STATES.BOOKED;
        }
      });
    } else {
      // Randomly seed ~25% booked seats for realism
      const seedCount = Math.floor(this.rows * this.cols * 0.25);
      let count = 0;
      while (count < seedCount) {
        const r = Math.floor(Math.random() * this.rows);
        const c = Math.floor(Math.random() * this.cols);
        if (this.grid[r][c] === SEAT_STATES.AVAILABLE) {
          this.grid[r][c] = SEAT_STATES.BOOKED;
          count++;
        }
      }
    }
  }

  // Select a seat (Toggle logic)
  toggleSeat(r, c) {
    if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return false;
    if (this.grid[r][c] === SEAT_STATES.BOOKED) return false; // Cannot modify booked seat

    if (this.grid[r][c] === SEAT_STATES.SELECTED) {
      this.grid[r][c] = SEAT_STATES.AVAILABLE;
      return 'deselected';
    } else if (this.grid[r][c] === SEAT_STATES.AVAILABLE) {
      this.grid[r][c] = SEAT_STATES.SELECTED;
      return 'selected';
    }
    return false;
  }

  // Confirm booking for all currently selected seats (Transition SELECTED -> BOOKED)
  confirmBooking() {
    const bookedCoords = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === SEAT_STATES.SELECTED) {
          this.grid[r][c] = SEAT_STATES.BOOKED;
          bookedCoords.push({ row: ROW_LABELS[r], col: c + 1, r, c });
        }
      }
    }
    return bookedCoords;
  }

  // Get array of all currently selected seats
  getSelectedSeats() {
    const selected = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === SEAT_STATES.SELECTED) {
          const tier = SeatMatrix.getSeatTier(r);
          selected.push({
            id: `${ROW_LABELS[r]}${c + 1}`,
            rowLabel: ROW_LABELS[r],
            colNumber: c + 1,
            r,
            c,
            tierName: tier.name,
            price: tier.price
          });
        }
      }
    }
    return selected;
  }

  // DSA Algorithm: Find consecutive available seats in a row (Sliding Window Algorithm)
  findConsecutiveSeats(count) {
    const results = [];
    for (let r = 0; r < this.rows; r++) {
      let currentStreak = 0;
      let startCol = -1;

      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === SEAT_STATES.AVAILABLE) {
          if (currentStreak === 0) startCol = c;
          currentStreak++;

          if (currentStreak === count) {
            results.push({
              row: ROW_LABELS[r],
              r,
              startCol: startCol + 1,
              endCol: c + 1,
              coords: Array.from({ length: count }, (_, i) => ({ r, c: startCol + i }))
            });
            // Reset for non-overlapping search, or continue with sliding window
            currentStreak = 0;
          }
        } else {
          currentStreak = 0;
        }
      }
    }
    return results;
  }

  // Auto-select best consecutive seats
  autoSelectBestSeats(count) {
    const availableStreaks = this.findConsecutiveSeats(count);
    if (availableStreaks.length === 0) return false;

    // Clear current selections
    this.clearSelection();

    // Prefer middle rows (rows E, F, G -> index 4, 5, 6) and center cols
    const bestOption = availableStreaks.sort((a, b) => {
      const distA = Math.abs(a.r - 4.5);
      const distB = Math.abs(b.r - 4.5);
      return distA - distB;
    })[0];

    bestOption.coords.forEach(({ r, c }) => {
      this.grid[r][c] = SEAT_STATES.SELECTED;
    });

    return bestOption;
  }

  clearSelection() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === SEAT_STATES.SELECTED) {
          this.grid[r][c] = SEAT_STATES.AVAILABLE;
        }
      }
    }
  }

  getStats() {
    let available = 0;
    let booked = 0;
    let selected = 0;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === SEAT_STATES.AVAILABLE) available++;
        else if (this.grid[r][c] === SEAT_STATES.BOOKED) booked++;
        else if (this.grid[r][c] === SEAT_STATES.SELECTED) selected++;
      }
    }

    return { total: this.rows * this.cols, available, booked, selected };
  }
}
