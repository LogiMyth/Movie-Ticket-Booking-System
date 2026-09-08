import { createContext, useContext, useState } from 'react';
import { SeatMatrix } from '../dsa/SeatMatrix';
import { BookingQueue, BookingRequest } from '../dsa/BookingQueue';
import { MOVIES } from '../data/movies';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Currently selected movie & showtime
  const [selectedMovie, setSelectedMovie] = useState(MOVIES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(MOVIES[0].showtimes[0]);
  const [selectedDate, setSelectedDate] = useState('Today, Sep 9');

  // DSA State: 2D Seat Matrix instance
  const [seatMatrix, setSeatMatrix] = useState(() => {
    const sm = new SeatMatrix(10, 14);
    sm.seedBookedSeats();
    return sm;
  });

  // Re-trigger matrix render updates
  const [matrixVersion, setMatrixVersion] = useState(0);

  // DSA State: Linked-List FIFO Queue
  const [bookingQueue] = useState(() => new BookingQueue());
  const [queueVersion, setQueueVersion] = useState(0);

  // Currently processing request in Queue
  const [processingRequest, setProcessingRequest] = useState(null);
  
  // Last confirmed booking ticket
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState(null);

  // Select movie helper
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    if (movie.showtimes && movie.showtimes.length > 0) {
      setSelectedShowtime(movie.showtimes[0]);
    }
    // Reset matrix for new movie
    const sm = new SeatMatrix(10, 14);
    sm.seedBookedSeats();
    setSeatMatrix(sm);
    setMatrixVersion(v => v + 1);
  };

  // Seat toggle handler
  const handleToggleSeat = (r, c) => {
    seatMatrix.toggleSeat(r, c);
    setMatrixVersion(v => v + 1);
  };

  // Auto select best consecutive seats using DSA algorithm
  const handleAutoSelectSeats = (count) => {
    const success = seatMatrix.autoSelectBestSeats(count);
    setMatrixVersion(v => v + 1);
    return success;
  };

  // Clear seat selections
  const handleClearSelection = () => {
    seatMatrix.clearSelection();
    setMatrixVersion(v => v + 1);
  };

  // Add booking to FIFO Queue
  const submitBookingToQueue = (customerName = 'Alex Mercer') => {
    const selectedSeats = seatMatrix.getSelectedSeats();
    if (selectedSeats.length === 0) return null;

    const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const request = new BookingRequest({
      customerName,
      movieTitle: selectedMovie.title,
      showTime: `${selectedDate} • ${selectedShowtime.time}`,
      seats: selectedSeats,
      totalAmount: totalAmount + 3.50, // includes convenience fee
      status: 'WAITING'
    });

    bookingQueue.enqueue(request);
    setQueueVersion(v => v + 1);
    return request;
  };

  // Process next item in FIFO Queue (simulates background processing engine)
  const processNextInQueue = () => {
    if (bookingQueue.isEmpty()) return null;

    const req = bookingQueue.dequeue();
    req.status = 'PROCESSING';
    setProcessingRequest(req);
    setQueueVersion(v => v + 1);

    // Simulate backend booking confirmation after 2.5 seconds
    setTimeout(() => {
      req.status = 'CONFIRMED';
      // Mark seats as permanently BOOKED in matrix
      seatMatrix.confirmBooking();
      setMatrixVersion(v => v + 1);
      setLastConfirmedBooking(req);
      setProcessingRequest(null);
      setQueueVersion(v => v + 1);
    }, 2500);

    return req;
  };

  // Helper stats
  const selectedSeats = seatMatrix.getSelectedSeats();
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const matrixStats = seatMatrix.getStats();

  return (
    <BookingContext.Provider
      value={{
        MOVIES,
        selectedMovie,
        setSelectedMovie: handleSelectMovie,
        selectedShowtime,
        setSelectedShowtime,
        selectedDate,
        setSelectedDate,
        seatMatrix,
        matrixVersion,
        handleToggleSeat,
        handleAutoSelectSeats,
        handleClearSelection,
        selectedSeats,
        subtotal,
        matrixStats,
        bookingQueue,
        queueVersion,
        submitBookingToQueue,
        processNextInQueue,
        processingRequest,
        lastConfirmedBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
