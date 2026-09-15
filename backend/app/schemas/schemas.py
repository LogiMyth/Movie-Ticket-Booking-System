import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class BaseDTO(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        serialize_by_alias=True,
        from_attributes=True
    )


class MovieDTO(BaseDTO):
    id: int
    title: str
    description: Optional[str] = None
    genre: Optional[str] = None
    duration_minutes: int
    language: Optional[str] = None
    release_date: Optional[datetime.date] = None
    poster_url: Optional[str] = None


class ShowDTO(BaseDTO):
    id: int
    movie_id: int
    movie_title: str
    theater_name: str
    screen_name: str
    show_date: datetime.date
    show_time: datetime.time
    price: Decimal


class SeatDTO(BaseDTO):
    id: int
    row_label: str
    seat_number: int
    seat_type: str
    price: Decimal
    available: bool


class BookingRequestDTO(BaseDTO):
    user_id: int
    show_id: int
    seat_ids: List[int] = Field(min_length=1)


class BookingResponseDTO(BaseDTO):
    booking_id: int
    booking_reference: str
    status: str
    movie_title: str
    theater_name: str
    screen_name: str
    show_date: datetime.date
    show_time: datetime.time
    seats: List[str]
    total_amount: Decimal
    booked_at: datetime.datetime
