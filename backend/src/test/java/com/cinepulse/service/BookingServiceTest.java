package com.cinepulse.service;

import com.cinepulse.dto.BookingRequestDTO;
import com.cinepulse.dto.BookingResponseDTO;
import com.cinepulse.exception.InvalidBookingException;
import com.cinepulse.exception.SeatUnavailableException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class BookingServiceTest {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private ShowService showService;

    @Autowired
    private MovieService movieService;

    @Test
    void testGetMoviesAndShows() {
        var movies = movieService.getAllMovies();
        assertFalse(movies.isEmpty(), "Movies seed data should exist");

        var shows = movieService.getShowsByMovieId(1L);
        assertFalse(shows.isEmpty(), "Shows for Movie 1 should exist");
    }

    @Test
    void testSuccessfulBookingAndShowSpecificAvailability() {
        // Book Seat 1 (ID 1) for Show 1 (ID 1) by User 1
        BookingRequestDTO request1 = new BookingRequestDTO(1L, 1L, List.of(1L, 2L));
        BookingResponseDTO response1 = bookingService.createBooking(request1);

        assertNotNull(response1.getBookingReference());
        assertEquals("CONFIRMED", response1.getStatus());
        assertEquals(2, response1.getSeats().size());

        // Attempting to book the SAME seat (ID 1) for the SAME Show (ID 1) MUST FAIL
        BookingRequestDTO duplicateRequest = new BookingRequestDTO(1L, 1L, List.of(1L));
        assertThrows(SeatUnavailableException.class, () -> {
            bookingService.createBooking(duplicateRequest);
        }, "Booking already booked seat for same show must throw SeatUnavailableException");

        // Booking the SAME physical seat (ID 1) for a DIFFERENT Show (ID 2) MUST SUCCEED
        BookingRequestDTO requestForShow2 = new BookingRequestDTO(1L, 2L, List.of(1L));
        BookingResponseDTO response2 = bookingService.createBooking(requestForShow2);
        assertNotNull(response2.getBookingReference());
        assertEquals("CONFIRMED", response2.getStatus());
    }

    @Test
    void testAtomicMultiSeatBookingFailure() {
        // Book Seat 1 (ID 1) for Show 1 first
        bookingService.createBooking(new BookingRequestDTO(1L, 1L, List.of(1L)));

        // Try booking Seat 1 (unavailable) AND Seat 3 (available) together
        BookingRequestDTO multiRequest = new BookingRequestDTO(1L, 1L, List.of(1L, 3L));
        assertThrows(SeatUnavailableException.class, () -> {
            bookingService.createBooking(multiRequest);
        });

        // Verify Seat 3 was NOT booked due to atomic rollback
        var seats = showService.getShowSeats(1L);
        var seat3 = seats.stream().filter(s -> s.getId().equals(3L)).findFirst().orElseThrow();
        assertTrue(seat3.isAvailable(), "Seat 3 should remain available due to atomic rollback");
    }

    @Test
    void testInvalidUserOrShowFails() {
        BookingRequestDTO invalidUserReq = new BookingRequestDTO(999L, 1L, List.of(1L));
        assertThrows(RuntimeException.class, () -> bookingService.createBooking(invalidUserReq));

        BookingRequestDTO invalidShowReq = new BookingRequestDTO(1L, 999L, List.of(1L));
        assertThrows(RuntimeException.class, () -> bookingService.createBooking(invalidShowReq));
    }
}
