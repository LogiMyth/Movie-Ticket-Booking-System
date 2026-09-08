package com.cinepulse.service;

import com.cinepulse.dto.SeatDTO;
import com.cinepulse.dto.ShowDTO;
import com.cinepulse.entity.Seat;
import com.cinepulse.entity.Show;
import com.cinepulse.exception.ResourceNotFoundException;
import com.cinepulse.repository.BookingSeatRepository;
import com.cinepulse.repository.SeatRepository;
import com.cinepulse.repository.ShowRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ShowService {

    private final ShowRepository showRepository;
    private final SeatRepository seatRepository;
    private final BookingSeatRepository bookingSeatRepository;

    public ShowService(ShowRepository showRepository, SeatRepository seatRepository, BookingSeatRepository bookingSeatRepository) {
        this.showRepository = showRepository;
        this.seatRepository = seatRepository;
        this.bookingSeatRepository = bookingSeatRepository;
    }

    public ShowDTO getShowById(Long id) {
        Show show = showRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with ID: " + id));
        return new ShowDTO(
                show.getId(),
                show.getMovie().getId(),
                show.getMovie().getTitle(),
                show.getScreen().getTheater().getName(),
                show.getScreen().getName(),
                show.getShowDate(),
                show.getShowTime(),
                show.getPrice()
        );
    }

    public List<SeatDTO> getShowSeats(Long showId) {
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with ID: " + showId));

        Long screenId = show.getScreen().getId();
        List<Seat> physicalSeats = seatRepository.findByScreenId(screenId);

        // Fetch set of seat IDs already booked for THIS SHOW
        Set<Long> bookedSeatIds = bookingSeatRepository.findBookedSeatIdsByShowId(showId);

        return physicalSeats.stream()
                .map(seat -> new SeatDTO(
                        seat.getId(),
                        seat.getRowLabel(),
                        seat.getSeatNumber(),
                        seat.getSeatType(),
                        show.getPrice(),
                        !bookedSeatIds.contains(seat.getId())
                ))
                .collect(Collectors.toList());
    }
}
