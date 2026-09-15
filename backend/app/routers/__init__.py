from app.routers.health import router as health_router
from app.routers.movies import router as movies_router
from app.routers.shows import router as shows_router
from app.routers.bookings import router as bookings_router

__all__ = [
    "health_router",
    "movies_router",
    "shows_router",
    "bookings_router",
]
