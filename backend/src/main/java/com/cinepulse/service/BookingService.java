package com.cinepulse.service;

import com.cinepulse.dto.BookingRequestDTO;
import com.cinepulse.dto.BookingResponseDTO;
import com.cinepulse.entity.*;
import com.cinepulse.exception.InvalidBookingException;
import com.cinepulse.exception.ResourceNotFoundException;
import com.cinepulse.exception.SeatUnavailableException;
import com.cinepulse.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShowRepository showRepository;
    private final SeatRepository seatRepository;
    private final BookingSeatRepository bookingSeatRepository;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          ShowRepository showRepository,
                          SeatRepository seatRepository,
                          BookingSeatRepository bookingSeatRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.showRepository = showRepository;
        this.seatRepository = seatRepository;
        this.bookingSeatRepository = bookingSeatRepository;
    }

    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO request) {
        // 1. Validate User
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        // 2. Validate Show
        Show show = showRepository.findById(request.getShowId())
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with ID: " + request.getShowId()));

        // 3. Validate Seats exist
        List<Long> requestedSeatIds = request.getSeatIds();
        if (requestedSeatIds == null || requestedSeatIds.isEmpty()) {
            throw new InvalidBookingException("Booking request must contain at least one seat.");
        }

        List<Seat> seats = seatRepository.findAllById(requestedSeatIds);
        if (seats.size() != requestedSeatIds.size()) {
            throw new InvalidBookingException("One or more requested seat IDs are invalid.");
        }

        // 4. Verify seats belong to the screen used by the selected show
        Long showScreenId = show.getScreen().getId();
        for (Seat seat : seats) {
            if (!seat.getScreen().getId().equals(showScreenId)) {
                throw new InvalidBookingException("Seat " + seat.getRowLabel() + seat.getSeatNumber() + " does not belong to screen for this show.");
            }
        }

        // 5. Verify seats are available for THIS SHOW
        Set<Long> currentlyBookedSeatIds = bookingSeatRepository.findBookedSeatIdsByShowId(show.getId());
        for (Seat seat : seats) {
            if (currentlyBookedSeatIds.contains(seat.getId())) {
                throw new SeatUnavailableException("Seat " + seat.getRowLabel() + seat.getSeatNumber() + " is already booked for this show.");
            }
        }

        // 6. Calculate total amount
        BigDecimal seatPrice = show.getPrice();
        BigDecimal totalAmount = seatPrice.multiply(BigDecimal.valueOf(seats.size()));

        // 7. Generate Booking Reference
        String bookingReference = "CP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // 8. Create Booking
        Booking booking = new Booking(user, show, bookingReference, "CONFIRMED", totalAmount);

        // 9. Add BookingSeats
        for (Seat seat : seats) {
            BookingSeat bookingSeat = new BookingSeat(booking, show, seat, seatPrice);
            booking.addBookingSeat(bookingSeat);
        }

        Booking savedBooking = bookingRepository.save(booking);

        // 10. Convert to Response DTO
        List<String> seatLabels = seats.stream()
                .map(s -> s.getRowLabel() + s.getSeatNumber())
                .collect(Collectors.toList());

        return new BookingResponseDTO(
                savedBooking.getId(),
                savedBooking.getBookingReference(),
                savedBooking.getStatus(),
                show.getMovie().getTitle(),
                show.getScreen().getTheater().getName(),
                show.getScreen().getName(),
                show.getShowDate(),
                show.getShowTime(),
                seatLabels,
                savedBooking.getTotalAmount(),
                savedBooking.getBookedAt() != null ? savedBooking.getBookedAt() : LocalDateTime.now()
        );
    }

    @Transactional(readOnly = true)
    public BookingResponseDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return convertToResponseDTO(booking);
    }

    @Transactional(readOnly = true)
    public BookingResponseDTO getBookingByReference(String reference) {
        Booking booking = bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with reference: " + reference));
        return convertToResponseDTO(booking);
    }

    private BookingResponseDTO convertToResponseDTO(Booking booking) {
        Show show = booking.getShow();
        List<String> seatLabels = booking.getBookingSeats().stream()
                .map(bs -> bs.getSeat().getRowLabel() + bs.getSeat().getSeatNumber())
                .collect(Collectors.toList());

        return new BookingResponseDTO(
                booking.getId(),
                booking.getBookingReference(),
                booking.getStatus(),
                show.getMovie().getTitle(),
                show.getScreen().getTheater().getName(),
                show.getScreen().getName(),
                show.getShowDate(),
                show.getShowTime(),
                seatLabels,
                booking.getTotalAmount(),
                booking.getBookedAt()
        );
    }
}
