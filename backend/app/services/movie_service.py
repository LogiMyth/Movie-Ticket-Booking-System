from typing import List
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Movie, Show
from app.schemas import MovieDTO, ShowDTO


def get_all_movies(db: Session) -> List[MovieDTO]:
    movies = db.query(Movie).all()
    return [MovieDTO.model_validate(m) for m in movies]


def get_movie_by_id(db: Session, movie_id: int) -> MovieDTO:
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Movie not found with ID: {movie_id}"
        )
    return MovieDTO.model_validate(movie)


def get_shows_by_movie_id(db: Session, movie_id: int) -> List[ShowDTO]:
    movie_exists = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Movie not found with ID: {movie_id}"
        )

    shows = db.query(Show).filter(Show.movie_id == movie_id).all()
    result = []
    for s in shows:
        result.append(
            ShowDTO(
                id=s.id,
                movie_id=s.movie_id,
                movie_title=s.movie.title,
                theater_name=s.screen.theater.name,
                screen_name=s.screen.name,
                show_date=s.show_date,
                show_time=s.show_time,
                price=s.price
            )
        )
    return result
