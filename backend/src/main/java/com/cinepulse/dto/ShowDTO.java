package com.cinepulse.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class ShowDTO {
    private Long id;
    private Long movieId;
    private String movieTitle;
    private String theaterName;
    private String screenName;
    private LocalDate showDate;
    private LocalTime showTime;
    private BigDecimal price;

    public ShowDTO() {}

    public ShowDTO(Long id, Long movieId, String movieTitle, String theaterName, String screenName, LocalDate showDate, LocalTime showTime, BigDecimal price) {
        this.id = id;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.theaterName = theaterName;
        this.screenName = screenName;
        this.showDate = showDate;
        this.showTime = showTime;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

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

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
