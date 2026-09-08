package com.cinepulse.repository;

import com.cinepulse.entity.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat, Long> {
    List<BookingSeat> findByBookingId(Long bookingId);
    List<BookingSeat> findByShowId(Long showId);

    @Query("SELECT bs.seat.id FROM BookingSeat bs WHERE bs.show.id = :showId AND bs.booking.status = 'CONFIRMED'")
    Set<Long> findBookedSeatIdsByShowId(@Param("showId") Long showId);
}
