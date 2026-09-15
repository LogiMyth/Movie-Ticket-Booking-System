import uuid
import datetime
from decimal import Decimal
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models import User, Show, Seat, Booking, BookingSeat
from app.schemas import BookingRequestDTO, BookingResponseDTO


def create_booking(db: Session, request: BookingRequestDTO) -> BookingResponseDTO:
    # 1. Validate User
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User not found with ID: {request.user_id}"
        )

    # 2. Validate Show
    show = db.query(Show).filter(Show.id == request.show_id).first()
    if not show:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Show not found with ID: {request.show_id}"
        )

    # 3. Validate Seats exist
    if not request.seat_ids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking request must contain at least one seat."
        )

    seats = db.query(Seat).filter(Seat.id.in_(request.seat_ids)).all()
    if len(seats) != len(request.seat_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="One or more requested seat IDs are invalid."
        )

    # 4. Verify seats belong to screen used by selected show
    show_screen_id = show.screen_id
    for seat in seats:
        if seat.screen_id != show_screen_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Seat {seat.row_label}{seat.seat_number} does not belong to screen for this show."
            )

    # 5. Verify seats are available for THIS SHOW
    booked_records = (
        db.query(BookingSeat.seat_id)
        .filter(BookingSeat.show_id == show.id, BookingSeat.seat_id.in_(request.seat_ids))
        .all()
    )
    if booked_records:
        already_booked_seat_ids = {r[0] for r in booked_records}
        conflict_seat = next(s for s in seats if s.id in already_booked_seat_ids)
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Seat {conflict_seat.row_label}{conflict_seat.seat_number} is already booked for this show."
        )

    # 6. Calculate total price
    seat_price = Decimal(str(show.price))
    total_amount = seat_price * len(seats)

    # 7. Generate Booking Reference
    ref_uuid = str(uuid.uuid4())[:8].upper()
    booking_reference = f"CP-{ref_uuid}"

    # 8. Create Booking
    new_booking = Booking(
        user_id=user.id,
        show_id=show.id,
        booking_reference=booking_reference,
        status="CONFIRMED",
        total_amount=total_amount,
        booked_at=datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    )

    try:
        db.add(new_booking)
        db.flush()  # populate new_booking.id

        # 9. Add BookingSeats
        for seat in seats:
            booking_seat = BookingSeat(
                booking_id=new_booking.id,
                seat_id=seat.id,
                show_id=show.id,
                price=seat_price
            )
            db.add(booking_seat)

        db.commit()
        db.refresh(new_booking)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="One or more selected seats were booked concurrently by another request."
        )

    # Build response
    seat_labels = [f"{s.row_label}{s.seat_number}" for s in seats]
    return BookingResponseDTO(
        booking_id=new_booking.id,
        booking_reference=new_booking.booking_reference,
        status=new_booking.status,
        movie_title=show.movie.title,
        theater_name=show.screen.theater.name,
        screen_name=show.screen.name,
        show_date=show.show_date,
        show_time=show.show_time,
        seats=seat_labels,
        total_amount=new_booking.total_amount,
        booked_at=new_booking.booked_at
    )


def get_booking_by_id(db: Session, booking_id: int) -> BookingResponseDTO:
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking not found with ID: {booking_id}"
        )
    return _convert_to_response_dto(booking)


def get_booking_by_reference(db: Session, reference: str) -> BookingResponseDTO:
    booking = db.query(Booking).filter(Booking.booking_reference == reference).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking not found with reference: {reference}"
        )
    return _convert_to_response_dto(booking)


def _convert_to_response_dto(booking: Booking) -> BookingResponseDTO:
    show = booking.show
    seat_labels = [f"{bs.seat.row_label}{bs.seat.seat_number}" for bs in booking.booking_seats]
    return BookingResponseDTO(
        booking_id=booking.id,
        booking_reference=booking.booking_reference,
        status=booking.status,
        movie_title=show.movie.title,
        theater_name=show.screen.theater.name,
        screen_name=show.screen.name,
        show_date=show.show_date,
        show_time=show.show_time,
        seats=seat_labels,
        total_amount=booking.total_amount,
        booked_at=booking.booked_at
    )
