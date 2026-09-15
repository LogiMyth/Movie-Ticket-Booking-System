"""Initial schema and seed data

Revision ID: 001_initial_schema_and_seed
Revises: 
Create Date: 2026-09-15 10:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '001_initial_schema_and_seed'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Users Table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('email', sa.String(150), nullable=False, unique=True),
        sa.Column('password', sa.String(255), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False)
    )

    # 2. Movies Table
    op.create_table(
        'movies',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('genre', sa.String(100), nullable=True),
        sa.Column('duration_minutes', sa.Integer(), nullable=False),
        sa.Column('language', sa.String(50), nullable=True),
        sa.Column('release_date', sa.Date(), nullable=True),
        sa.Column('poster_url', sa.String(500), nullable=True)
    )

    # 3. Theaters Table
    op.create_table(
        'theaters',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(150), nullable=False),
        sa.Column('location', sa.String(255), nullable=False)
    )

    # 4. Screens Table
    op.create_table(
        'screens',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('theater_id', sa.Integer(), sa.ForeignKey('theaters.id', ondelete='CASCADE'), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('total_rows', sa.Integer(), nullable=False),
        sa.Column('total_columns', sa.Integer(), nullable=False)
    )

    # 5. Seats Table
    op.create_table(
        'seats',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('screen_id', sa.Integer(), sa.ForeignKey('screens.id', ondelete='CASCADE'), nullable=False),
        sa.Column('row_label', sa.String(5), nullable=False),
        sa.Column('seat_number', sa.Integer(), nullable=False),
        sa.Column('seat_type', sa.String(20), server_default='STANDARD', nullable=False),
        sa.UniqueConstraint('screen_id', 'row_label', 'seat_number', name='uk_screen_seat')
    )

    # 6. Shows Table
    op.create_table(
        'shows',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('movie_id', sa.Integer(), sa.ForeignKey('movies.id', ondelete='CASCADE'), nullable=False),
        sa.Column('screen_id', sa.Integer(), sa.ForeignKey('screens.id', ondelete='CASCADE'), nullable=False),
        sa.Column('show_date', sa.Date(), nullable=False),
        sa.Column('show_time', sa.Time(), nullable=False),
        sa.Column('price', sa.Numeric(10, 2), nullable=False)
    )
    op.create_index('idx_shows_movie_date', 'shows', ['movie_id', 'show_date'])
    op.create_index('idx_shows_screen_date', 'shows', ['screen_id', 'show_date'])

    # 7. Bookings Table
    op.create_table(
        'bookings',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('show_id', sa.Integer(), sa.ForeignKey('shows.id', ondelete='CASCADE'), nullable=False),
        sa.Column('booking_reference', sa.String(50), nullable=False, unique=True),
        sa.Column('status', sa.String(20), server_default='CONFIRMED', nullable=False),
        sa.Column('total_amount', sa.Numeric(10, 2), nullable=False),
        sa.Column('booked_at', sa.DateTime(), server_default=sa.func.now(), nullable=False)
    )
    op.create_index('idx_bookings_user', 'bookings', ['user_id'])
    op.create_index('idx_bookings_show', 'bookings', ['show_id'])

    # 8. Booking Seats Table
    op.create_table(
        'booking_seats',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('booking_id', sa.Integer(), sa.ForeignKey('bookings.id', ondelete='CASCADE'), nullable=False),
        sa.Column('seat_id', sa.Integer(), sa.ForeignKey('seats.id', ondelete='CASCADE'), nullable=False),
        sa.Column('show_id', sa.Integer(), sa.ForeignKey('shows.id', ondelete='CASCADE'), nullable=False),
        sa.Column('price', sa.Numeric(10, 2), nullable=False),
        sa.UniqueConstraint('show_id', 'seat_id', name='uk_show_seat_unique')
    )

    # Seed Data
    users_table = sa.table('users',
        sa.column('id', sa.Integer),
        sa.column('name', sa.String),
        sa.column('email', sa.String),
        sa.column('password', sa.String)
    )
    op.bulk_insert(users_table, [
        {'id': 1, 'name': 'Alex Mercer', 'email': 'alex.mercer@example.com', 'password': '$2a$10$e8w20.q57QY765E4f8q7sO1s8d.95u1Wp9J8t7r6e5w4q3e2r1t0y'}
    ])

    movies_table = sa.table('movies',
        sa.column('id', sa.Integer),
        sa.column('title', sa.String),
        sa.column('description', sa.String),
        sa.column('genre', sa.String),
        sa.column('duration_minutes', sa.Integer),
        sa.column('language', sa.String),
        sa.column('release_date', sa.Date),
        sa.column('poster_url', sa.String)
    )
    op.bulk_insert(movies_table, [
        {
            'id': 1,
            'title': 'Dune: Part Three',
            'description': 'Paul Atreides faces the cosmic consequences of his holy war across the known universe as new galactic threats emerge.',
            'genre': 'Sci-Fi, Adventure',
            'duration_minutes': 165,
            'language': 'English',
            'release_date': '2026-11-20',
            'poster_url': 'https://images.unsplash.com/photo-1534447677768-be436bb09401'
        },
        {
            'id': 2,
            'title': 'Interstellar: 12th Anniversary',
            'description': 'A team of ex-NASA pilots travel through a wormhole near Saturn in search of a new home for humanity.',
            'genre': 'Sci-Fi, Drama',
            'duration_minutes': 169,
            'language': 'English',
            'release_date': '2014-11-07',
            'poster_url': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
        }
    ])

    theaters_table = sa.table('theaters',
        sa.column('id', sa.Integer),
        sa.column('name', sa.String),
        sa.column('location', sa.String)
    )
    op.bulk_insert(theaters_table, [
        {'id': 1, 'name': 'CinéPulse Grand Dolby', 'location': 'Downtown Cinema Center, Hall 1'}
    ])

    screens_table = sa.table('screens',
        sa.column('id', sa.Integer),
        sa.column('theater_id', sa.Integer),
        sa.column('name', sa.String),
        sa.column('total_rows', sa.Integer),
        sa.column('total_columns', sa.Integer)
    )
    op.bulk_insert(screens_table, [
        {'id': 1, 'theater_id': 1, 'name': 'Screen 1 - Grand IMAX', 'total_rows': 10, 'total_columns': 14}
    ])

    seats_table = sa.table('seats',
        sa.column('id', sa.Integer),
        sa.column('screen_id', sa.Integer),
        sa.column('row_label', sa.String),
        sa.column('seat_number', sa.Integer),
        sa.column('seat_type', sa.String)
    )
    op.bulk_insert(seats_table, [
        {'id': 1, 'screen_id': 1, 'row_label': 'A', 'seat_number': 1, 'seat_type': 'STANDARD'},
        {'id': 2, 'screen_id': 1, 'row_label': 'A', 'seat_number': 2, 'seat_type': 'STANDARD'},
        {'id': 3, 'screen_id': 1, 'row_label': 'E', 'seat_number': 5, 'seat_type': 'PREMIUM'},
        {'id': 4, 'screen_id': 1, 'row_label': 'E', 'seat_number': 6, 'seat_type': 'PREMIUM'},
        {'id': 5, 'screen_id': 1, 'row_label': 'I', 'seat_number': 10, 'seat_type': 'VIP'}
    ])

    shows_table = sa.table('shows',
        sa.column('id', sa.Integer),
        sa.column('movie_id', sa.Integer),
        sa.column('screen_id', sa.Integer),
        sa.column('show_date', sa.Date),
        sa.column('show_time', sa.Time),
        sa.column('price', sa.Numeric)
    )
    op.bulk_insert(shows_table, [
        {'id': 1, 'movie_id': 1, 'screen_id': 1, 'show_date': '2026-09-10', 'show_time': '18:00:00', 'price': 22.00},
        {'id': 2, 'movie_id': 2, 'screen_id': 1, 'show_date': '2026-09-10', 'show_time': '21:30:00', 'price': 18.50}
    ])


def downgrade() -> None:
    op.drop_table('booking_seats')
    op.drop_table('bookings')
    op.drop_table('shows')
    op.drop_table('seats')
    op.drop_table('screens')
    op.drop_table('theaters')
    op.drop_table('movies')
    op.drop_table('users')
