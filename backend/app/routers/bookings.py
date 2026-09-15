from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import BookingRequestDTO, BookingResponseDTO
from app.services import booking_service

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


@router.post("", response_model=BookingResponseDTO, status_code=status.HTTP_201_CREATED)
def create_booking(request: BookingRequestDTO, db: Session = Depends(get_db)):
    return booking_service.create_booking(db, request)


@router.get("/{booking_id}", response_model=BookingResponseDTO)
def get_booking_by_id(booking_id: int, db: Session = Depends(get_db)):
    return booking_service.get_booking_by_id(db, booking_id)


@router.get("/reference/{reference}", response_model=BookingResponseDTO)
def get_booking_by_reference(reference: str, db: Session = Depends(get_db)):
    return booking_service.get_booking_by_reference(db, reference)
