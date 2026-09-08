package com.cinepulse.dto;

import java.math.BigDecimal;

public class SeatDTO {
    private Long id;
    private String rowLabel;
    private Integer seatNumber;
    private String seatType;
    private BigDecimal price;
    private boolean available;

    public SeatDTO() {}

    public SeatDTO(Long id, String rowLabel, Integer seatNumber, String seatType, BigDecimal price, boolean available) {
        this.id = id;
        this.rowLabel = rowLabel;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.price = price;
        this.available = available;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRowLabel() { return rowLabel; }
    public void setRowLabel(String rowLabel) { this.rowLabel = rowLabel; }

    public Integer getSeatNumber() { return seatNumber; }
    public void setSeatNumber(Integer seatNumber) { this.seatNumber = seatNumber; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
