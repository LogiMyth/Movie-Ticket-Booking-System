from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import MovieDTO, ShowDTO
from app.services import movie_service

router = APIRouter(prefix="/api/movies", tags=["Movies"])


@router.get("", response_model=List[MovieDTO])
def get_all_movies(db: Session = Depends(get_db)):
    return movie_service.get_all_movies(db)


@router.get("/{movie_id}", response_model=MovieDTO)
def get_movie_by_id(movie_id: int, db: Session = Depends(get_db)):
    return movie_service.get_movie_by_id(db, movie_id)


@router.get("/{movie_id}/shows", response_model=List[ShowDTO])
def get_shows_by_movie_id(movie_id: int, db: Session = Depends(get_db)):
    return movie_service.get_shows_by_movie_id(db, movie_id)
