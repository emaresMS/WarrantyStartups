from __future__ import annotations

import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

_ENV_FILE = Path(__file__).parent / ".env"
load_dotenv(_ENV_FILE)

_REQUIRED_VARS: tuple[str, ...] = (
    "SUPABASE_URL",
    "SUPABASE_JWT_SECRET",
    "DATABASE_URL",
)

_DEFAULT_CORS_ORIGINS = "http://localhost:5173"
_DEFAULT_PORT = 5000


@dataclass(frozen=True)
class Config:
    supabase_url: str
    supabase_jwt_secret: str
    database_url: str
    cors_origins: list[str]
    port: int


def _parse_cors_origins(raw: str) -> list[str]:
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


def _load_config() -> Config:
    missing = [var for var in _REQUIRED_VARS if not os.environ.get(var)]
    if missing:
        raise RuntimeError(
            f"Missing required environment variables: {', '.join(missing)}. "
            "Copy server/.env.example to server/.env and fill in real values."
        )

    raw_cors = os.environ.get("CORS_ORIGINS", _DEFAULT_CORS_ORIGINS)
    raw_port = os.environ.get("PORT", str(_DEFAULT_PORT))

    try:
        port = int(raw_port)
    except ValueError:
        raise RuntimeError(f"PORT must be an integer, got: {raw_port!r}")

    return Config(
        supabase_url=os.environ["SUPABASE_URL"],
        supabase_jwt_secret=os.environ["SUPABASE_JWT_SECRET"],
        database_url=os.environ["DATABASE_URL"],
        cors_origins=_parse_cors_origins(raw_cors),
        port=port,
    )


@lru_cache(maxsize=1)
def get_config() -> Config:
    return _load_config()
