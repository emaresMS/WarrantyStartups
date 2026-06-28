from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class InspectionStatus(str, Enum):
    DRAFT = "draft"
    SUBMITTED = "submitted"
    APPROVED = "approved"


class Inspection(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    user_id: str = Field(alias="userId")
    title: str
    site_label: str = Field(alias="siteLabel")
    status: InspectionStatus
    form_data: dict[str, Any] = Field(alias="formData")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    deleted_at: datetime | None = Field(default=None, alias="deletedAt")


class CreateInspectionRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    user_id: str = Field(alias="userId")
    title: str
    site_label: str = Field(alias="siteLabel")
    form_data: dict[str, Any] = Field(default_factory=dict, alias="formData")
    status: InspectionStatus = InspectionStatus.DRAFT


class UpdateInspectionRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    title: str | None = None
    site_label: str | None = Field(default=None, alias="siteLabel")
    form_data: dict[str, Any] | None = Field(default=None, alias="formData")
    status: InspectionStatus | None = None
