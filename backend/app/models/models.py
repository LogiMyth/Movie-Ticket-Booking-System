import datetime
from decimal import Decimal
from typing import List, Optional
from sqlalchemy import (
    String, Integer, Text, Date, Time, DateTime, Numeric,
    ForeignKey, UniqueConstraint, Index, func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )

    bookings: Mapped[List["Booking"]] = relationship("Booking", back_populates="user", cascade="all, delete-orphan")


class Movie(Base):
    __tablename__ = "movies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    genre: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    language: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    release_date: Mapped[Optional[datetime.date]] = mapped_column(Date, nullable=True)
    poster_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    shows: Mapped[List["Show"]] = relationship("Show", back_populates="movie", cascade="all, delete-orphan")


class Theater(Base):
    __tablename__ = "theaters"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)

    screens: Mapped[List["Screen"]] = relationship("Screen", back_populates="theater", cascade="all, delete-orphan")


class Screen(Base):
    __tablename__ = "screens"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    theater_id: Mapped[int] = mapped_column(Integer, ForeignKey("theaters.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    total_rows: Mapped[int] = mapped_column(Integer, nullable=False)
    total_columns: Mapped[int] = mapped_column(Integer, nullable=False)

    theater: Mapped["Theater"] = relationship("Theater", back_populates="screens")
    seats: Mapped[List["Seat"]] = relationship("Seat", back_populates="screen", cascade="all, delete-orphan")
    shows: Mapped[List["Show"]] = relationship("Show", back_populates="screen", cascade="all, delete-orphan")


class Seat(Base):
    __tablename__ = "seats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    screen_id: Mapped[int] = mapped_column(Integer, ForeignKey("screens.id", ondelete="CASCADE"), nullable=False)
    row_label: Mapped[str] = mapped_column(String(5), nullable=False)
    seat_number: Mapped[int] = mapped_column(Integer, nullable=False)
    seat_type: Mapped[str] = mapped_column(String(20), nullable=False, server_default="STANDARD")

    __table_args__ = (
        UniqueConstraint("screen_id", "row_label", "seat_number", name="uk_screen_seat"),
    )

    screen: Mapped["Screen"] = relationship("Screen", back_populates="seats")


class Show(Base):
    __tablename__ = "shows"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    movie_id: Mapped[int] = mapped_column(Integer, ForeignKey("movies.id", ondelete="CASCADE"), nullable=False)
    screen_id: Mapped[int] = mapped_column(Integer, ForeignKey("screens.id", ondelete="CASCADE"), nullable=False)
    show_date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    show_time: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    __table_args__ = (
        Index("idx_shows_movie_date", "movie_id", "show_date"),
        Index("idx_shows_screen_date", "screen_id", "show_date"),
    )

    movie: Mapped["Movie"] = relationship("Movie", back_populates="shows")
    screen: Mapped["Screen"] = relationship("Screen", back_populates="shows")
    bookings: Mapped[List["Booking"]] = relationship("Booking", back_populates="show", cascade="all, delete-orphan")


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    show_id: Mapped[int] = mapped_column(Integer, ForeignKey("shows.id", ondelete="CASCADE"), nullable=False)
    booking_reference: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, server_default="CONFIRMED")
    total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    booked_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )

    __table_args__ = (
        Index("idx_bookings_user", "user_id"),
        Index("idx_bookings_show", "show_id"),
    )

    user: Mapped["User"] = relationship("User", back_populates="bookings")
    show: Mapped["Show"] = relationship("Show", back_populates="bookings")
    booking_seats: Mapped[List["BookingSeat"]] = relationship("BookingSeat", back_populates="booking", cascade="all, delete-orphan")


class BookingSeat(Base):
    __tablename__ = "booking_seats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    booking_id: Mapped[int] = mapped_column(Integer, ForeignKey("bookings.id", ondelete="CASCADE"), nullable=False)
    seat_id: Mapped[int] = mapped_column(Integer, ForeignKey("seats.id", ondelete="CASCADE"), nullable=False)
    show_id: Mapped[int] = mapped_column(Integer, ForeignKey("shows.id", ondelete="CASCADE"), nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    __table_args__ = (
        UniqueConstraint("show_id", "seat_id", name="uk_show_seat_unique"),
    )

    booking: Mapped["Booking"] = relationship("Booking", back_populates="booking_seats")
    seat: Mapped["Seat"] = relationship("Seat")
    show: Mapped["Show"] = relationship("Show")
