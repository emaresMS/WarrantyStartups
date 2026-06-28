from __future__ import annotations

from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")


class ApiError(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    error: str
    details: Any | None = None


class Paginated(BaseModel, Generic[T]):
    model_config = ConfigDict(populate_by_name=True)

    data: list[T]
    total: int
    page: int
    page_size: int = Field(alias="pageSize")
