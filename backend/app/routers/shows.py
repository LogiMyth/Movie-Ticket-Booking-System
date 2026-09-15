from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import ShowDTO, SeatDTO
from app.services import show_service

router = APIRouter(prefix="/api/shows", tags=["Shows"])


@router.get("/{show_id}", response_model=ShowDTO)
def get_show_by_id(show_id: int, db: Session = Depends(get_db)):
    return show_service.get_show_by_id(db, show_id)


@router.get("/{show_id}/seats", response_model=List[SeatDTO])
def get_show_seats(show_id: int, db: Session = Depends(get_db)):
    return show_service.get_show_seats(db, show_id)
