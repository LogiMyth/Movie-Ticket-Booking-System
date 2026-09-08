package com.cinepulse.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class BookingResponseDTO {

    private Long bookingId;
    private String bookingReference;
    private String status;
    private String movieTitle;
    private String theaterName;
    private String screenName;
    private LocalDate showDate;
    private LocalTime showTime;
    private List<String> seats;
    private BigDecimal totalAmount;
    private LocalDateTime bookedAt;

    public BookingResponseDTO() {}

    public BookingResponseDTO(Long bookingId, String bookingReference, String status, String movieTitle, String theaterName, String screenName, LocalDate showDate, LocalTime showTime, List<String> seats, BigDecimal totalAmount, LocalDateTime bookedAt) {
        this.bookingId = bookingId;
        this.bookingReference = bookingReference;
        this.status = status;
        this.movieTitle = movieTitle;
        this.theaterName = theaterName;
        this.screenName = screenName;
        this.showDate = showDate;
        this.showTime = showTime;
        this.seats = seats;
        this.totalAmount = totalAmount;
        this.bookedAt = bookedAt;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMovieTitle() { return movieTitle; }
    public void setMovieTitle(String movieTitle) { this.movieTitle = movieTitle; }

    public String getTheaterName() { return theaterName; }
    public void setTheaterName(String theaterName) { this.theaterName = theaterName; }

    public String getScreenName() { return screenName; }
    public void setScreenName(String screenName) { this.screenName = screenName; }

    public LocalDate getShowDate() { return showDate; }
    public void setShowDate(LocalDate showDate) { this.showDate = showDate; }

    public LocalTime getShowTime() { return showTime; }
    public void setShowTime(LocalTime showTime) { this.showTime = showTime; }

    public List<String> getSeats() { return seats; }
    public void setSeats(List<String> seats) { this.seats = seats; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getBookedAt() { return bookedAt; }
    public void setBookedAt(LocalDateTime bookedAt) { this.bookedAt = bookedAt; }
}
