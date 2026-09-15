import { createContext, useContext, useState, useEffect } from 'react';
import { SeatMatrix } from '../dsa/SeatMatrix';
import { BookingQueue, BookingRequest } from '../dsa/BookingQueue';
import { MOVIES as FALLBACK_MOVIES } from '../data/movies';

const BookingContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const BookingProvider = ({ children }) => {
  // Live Backend Data
  const [moviesList, setMoviesList] = useState(FALLBACK_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState(FALLBACK_MOVIES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(FALLBACK_MOVIES[0].showtimes[0]);
  const [selectedDate, setSelectedDate] = useState('Today, Sep 9');

  // Fetch Movies from Backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/movies`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Map backend DTO to UI expected structure
          const formattedMovies = data.map(m => ({
            id: m.id.toString(),
            title: m.title,
            poster: m.posterUrl || FALLBACK_MOVIES[0].poster,
            backdrop: m.posterUrl || FALLBACK_MOVIES[0].backdrop,
            genre: m.genre ? m.genre.split(', ') : ["Sci-Fi"],
            duration: `${m.durationMinutes}m`,
            rating: "4.9",
            votes: "10k",
            format: "IMAX 3D",
            tagline: "Experience the magic",
            synopsis: m.description,
            cast: ["Timothée Chalamet", "Zendaya"],
            director: "Denis Villeneuve",
            priceTier: "VIP",
            releaseYear: m.releaseDate ? m.releaseDate.split('-')[0] : "2026",
            ageRating: "PG-13",
            showtimes: [
              { id: "s1", time: "18:00", type: "IMAX 3D", hall: "Screen 1 - Grand IMAX" },
              { id: "s2", time: "21:30", type: "Dolby Cinema", hall: "Screen 1 - Grand IMAX" }
            ]
          }));
          setMoviesList(formattedMovies);
          setSelectedMovie(formattedMovies[0]);
          setSelectedShowtime(formattedMovies[0].showtimes[0]);
        }
      })
      .catch(() => {
        console.warn("Backend API offline; falling back to local dataset.");
      });
  }, []);

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

  // Add booking to FIFO Queue (and submit to backend)
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

  // Process next item in FIFO Queue & execute Spring Boot POST /api/bookings
  const processNextInQueue = () => {
    if (bookingQueue.isEmpty()) return null;

    const req = bookingQueue.dequeue();
    req.status = 'PROCESSING';
    setProcessingRequest(req);
    setQueueVersion(v => v + 1);

    // Call backend Spring Boot REST API
    fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        showId: 1,
        seatIds: req.seats.map((_, idx) => idx + 1)
      })
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        req.status = 'CONFIRMED';
        if (data && data.bookingReference) {
          req.id = data.bookingReference;
        }
        seatMatrix.confirmBooking();
        setMatrixVersion(v => v + 1);
        setLastConfirmedBooking(req);
        setProcessingRequest(null);
        setQueueVersion(v => v + 1);
      })
      .catch(() => {
        // Fallback simulation if backend endpoint unreachable
        setTimeout(() => {
          req.status = 'CONFIRMED';
          seatMatrix.confirmBooking();
          setMatrixVersion(v => v + 1);
          setLastConfirmedBooking(req);
          setProcessingRequest(null);
          setQueueVersion(v => v + 1);
        }, 1500);
      });

    return req;
  };

  // Helper stats
  const selectedSeats = seatMatrix.getSelectedSeats();
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const matrixStats = seatMatrix.getStats();

  return (
    <BookingContext.Provider
      value={{
        MOVIES: moviesList,
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
