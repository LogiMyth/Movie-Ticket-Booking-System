package com.cinepulse.service;

import com.cinepulse.entity.Show;
import com.cinepulse.repository.ShowRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowService {

    private final ShowRepository showRepository;

    public ShowService(ShowRepository showRepository) {
        this.showRepository = showRepository;
    }

    public List<Show> getShowsByMovie(Long movieId) {
        return showRepository.findByMovieId(movieId);
    }

    public Optional<Show> getShowById(Long id) {
        return showRepository.findById(id);
    }
}
