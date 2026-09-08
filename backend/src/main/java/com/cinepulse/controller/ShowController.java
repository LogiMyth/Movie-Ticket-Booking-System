package com.cinepulse.controller;

import com.cinepulse.dto.SeatDTO;
import com.cinepulse.dto.ShowDTO;
import com.cinepulse.service.ShowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shows")
@CrossOrigin(origins = "http://localhost:5173")
public class ShowController {

    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShowDTO> getShowById(@PathVariable Long id) {
        return ResponseEntity.ok(showService.getShowById(id));
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<SeatDTO>> getShowSeats(@PathVariable Long id) {
        return ResponseEntity.ok(showService.getShowSeats(id));
    }
}
