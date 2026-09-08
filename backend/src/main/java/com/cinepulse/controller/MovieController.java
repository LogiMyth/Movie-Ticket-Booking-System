package com.cinepulse.controller;

import com.cinepulse.dto.MovieDTO;
import com.cinepulse.dto.ShowDTO;
import com.cinepulse.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @GetMapping("/{id}/shows")
    public ResponseEntity<List<ShowDTO>> getShowsByMovieId(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getShowsByMovieId(id));
    }
}
