from flask import Blueprint

from server.api.v1.health import health_bp

v1_bp = Blueprint("v1", __name__, url_prefix="/api/v1")
v1_bp.register_blueprint(health_bp)
