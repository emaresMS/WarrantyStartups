"""
Phase 1 placeholder: JWT authentication middleware.

This module will verify Supabase-issued JWTs on protected routes.
Implementation plan:
  - Extract the Bearer token from the Authorization header.
  - Decode and verify the JWT signature using SUPABASE_JWT_SECRET (HS256).
  - Validate standard claims: exp, iat, aud ("authenticated").
  - Attach the decoded payload (user id, role, email) to Flask's `g` object
    so downstream route handlers can read the authenticated user without
    re-parsing the token.
  - Return HTTP 401 with { "error": "Unauthorized" } if the token is absent,
    expired, or has an invalid signature.
  - Return HTTP 403 with { "error": "Forbidden" } if the authenticated user
    lacks the required role for the requested resource.

Usage (Phase 1):
  @v1_bp.before_request
  def require_auth():
      verify_jwt()
"""

from flask import g, jsonify, request


def verify_jwt() -> None:
    """Stub — Phase 1 will implement Supabase JWT verification here."""
    pass
