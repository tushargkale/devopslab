from fastapi import FastAPI
from .database import Base, engine
from .models import Lab

app = FastAPI(title="DevOpsLab API")

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {
        "application": "DevOpsLab",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/labs")
def get_labs():
    return [
        {
            "id": 1,
            "name": "Linux",
            "status": "not_started"
        },
        {
            "id": 2,
            "name": "Git",
            "status": "not_started"
        },
        {
            "id": 3,
            "name": "Docker",
            "status": "not_started"
        },
        {
            "id": 4,
            "name": "CI/CD",
            "status": "not_started"
        }
    ]
