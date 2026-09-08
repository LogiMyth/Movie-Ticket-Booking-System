package com.cinepulse.service;

import com.cinepulse.dto.MovieDTO;
import com.cinepulse.dto.ShowDTO;

import com.cinepulse.entity.Movie;
import com.cinepulse.entity.Show;
import com.cinepulse.exception.ResourceNotFoundException;
import com.cinepulse.repository.MovieRepository;
import com.cinepulse.repository.ShowRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MovieService {

    private final MovieRepository movieRepository;
    private final ShowRepository showRepository;

    public MovieService(MovieRepository movieRepository, ShowRepository showRepository) {
        this.movieRepository = movieRepository;
        this.showRepository = showRepository;
    }

    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(this::convertToMovieDTO)
                .collect(Collectors.toList());
    }

    public MovieDTO getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + id));
        return convertToMovieDTO(movie);
    }

    public List<ShowDTO> getShowsByMovieId(Long movieId) {
        if (!movieRepository.existsById(movieId)) {
            throw new ResourceNotFoundException("Movie not found with ID: " + movieId);
        }
        return showRepository.findByMovieId(movieId).stream()
                .map(this::convertToShowDTO)
                .collect(Collectors.toList());
    }

    private MovieDTO convertToMovieDTO(Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getTitle(),
                movie.getDescription(),
                movie.getGenre(),
                movie.getDurationMinutes(),
                movie.getLanguage(),
                movie.getReleaseDate(),
                movie.getPosterUrl()
        );
    }

    private ShowDTO convertToShowDTO(Show show) {
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
}
