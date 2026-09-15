from typing import List
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Show, Seat, BookingSeat
from app.schemas import ShowDTO, SeatDTO


def get_show_by_id(db: Session, show_id: int) -> ShowDTO:
    show = db.query(Show).filter(Show.id == show_id).first()
    if not show:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Show not found with ID: {show_id}"
        )
    return ShowDTO(
        id=show.id,
        movie_id=show.movie_id,
        movie_title=show.movie.title,
        theater_name=show.screen.theater.name,
        screen_name=show.screen.name,
        show_date=show.show_date,
        show_time=show.show_time,
        price=show.price
    )


def get_show_seats(db: Session, show_id: int) -> List[SeatDTO]:
    show = db.query(Show).filter(Show.id == show_id).first()
    if not show:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Show not found with ID: {show_id}"
        )

    physical_seats = db.query(Seat).filter(Seat.screen_id == show.screen_id).all()

    # Get set of booked seat IDs for this show
    booked_seat_records = db.query(BookingSeat.seat_id).filter(BookingSeat.show_id == show_id).all()
    booked_seat_ids = {row[0] for row in booked_seat_records}

    result = []
    for s in physical_seats:
        is_available = s.id not in booked_seat_ids
        result.append(
            SeatDTO(
                id=s.id,
                row_label=s.row_label,
                seat_number=s.seat_number,
                seat_type=s.seat_type,
                price=show.price,
                available=is_available
            )
        )
    return result
