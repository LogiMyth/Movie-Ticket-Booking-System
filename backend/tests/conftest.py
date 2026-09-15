import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import User, Movie, Theater, Screen, Seat, Show

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()

    # Seed data for testing
    user = User(id=1, name="Alex Mercer", email="alex.mercer@example.com", password="hash")
    movie1 = Movie(id=1, title="Dune: Part Three", description="Dune desc", genre="Sci-Fi", duration_minutes=165, language="English", poster_url="http://example.com/poster.jpg")
    movie2 = Movie(id=2, title="Interstellar", description="Interstellar desc", genre="Sci-Fi", duration_minutes=169, language="English", poster_url="http://example.com/poster2.jpg")
    theater = Theater(id=1, name="CinéPulse Grand Dolby", location="Downtown")
    screen = Screen(id=1, theater_id=1, name="Screen 1 - Grand IMAX", total_rows=10, total_columns=14)
    
    seat1 = Seat(id=1, screen_id=1, row_label="A", seat_number=1, seat_type="STANDARD")
    seat2 = Seat(id=2, screen_id=1, row_label="A", seat_number=2, seat_type="STANDARD")
    seat3 = Seat(id=3, screen_id=1, row_label="E", seat_number=5, seat_type="PREMIUM")

    import datetime
    show1 = Show(id=1, movie_id=1, screen_id=1, show_date=datetime.date(2026, 9, 10), show_time=datetime.time(18, 0, 0), price=22.00)
    show2 = Show(id=2, movie_id=2, screen_id=1, show_date=datetime.date(2026, 9, 10), show_time=datetime.time(21, 30, 0), price=18.50)

    session.add_all([user, movie1, movie2, theater, screen, seat1, seat2, seat3, show1, show2])
    session.commit()

    yield session

    session.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    def _override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
