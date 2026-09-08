/**
 * QueueNode - Linked list node representation for FIFO Queue
 */
export class QueueNode {
  constructor(bookingRequest) {
    this.data = bookingRequest; // BookingRequest object
    this.next = null;
  }
}

/**
 * BookingQueue - FIFO Linked-List Queue Data Structure
 * Implements First-In-First-Out queue for cinema booking processing.
 */
export class BookingQueue {
  constructor() {
    this.head = null; // Front of the queue
    this.tail = null; // Back of the queue
    this.length = 0;
  }

  // Enqueue a request (Add to back of queue - O(1))
  enqueue(bookingRequest) {
    const newNode = new QueueNode(bookingRequest);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this.length;
  }

  // Dequeue a request (Remove from front of queue - O(1))
  dequeue() {
    if (!this.head) return null;
    const removedNode = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.length--;
    removedNode.next = null;
    return removedNode.data;
  }

  // Peek at the front item without removing (O(1))
  peek() {
    return this.head ? this.head.data : null;
  }

  // Check if queue is empty
  isEmpty() {
    return this.length === 0;
  }

  // Get total number of items in queue
  size() {
    return this.length;
  }

  // Convert queue to array for visualization (Front to Back)
  toArray() {
    const result = [];
    let current = this.head;
    let position = 1;
    while (current) {
      result.push({
        ...current.data,
        queuePosition: position++
      });
      current = current.next;
    }
    return result;
  }

  // Clear queue
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

/**
 * BookingRequest data model
 */
export class BookingRequest {
  constructor({
    id = `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName = 'Anonymous User',
    movieTitle = '',
    showTime = '',
    seats = [],
    totalAmount = 0,
    timestamp = new Date(),
    status = 'WAITING' // WAITING, PROCESSING, CONFIRMED, FAILED
  }) {
    this.id = id;
    this.customerName = customerName;
    this.movieTitle = movieTitle;
    this.showTime = showTime;
    this.seats = seats;
    this.totalAmount = totalAmount;
    this.timestamp = timestamp;
    this.status = status;
  }
}
