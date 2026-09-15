import time
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "Movie Ticket Booking Backend",
        "timestamp": int(time.time() * 1000)
    }
