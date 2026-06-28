from __future__ import annotations

from flask import Flask, jsonify
from flask_cors import CORS

from server.api.v1 import v1_bp
from server.config import get_config


def create_app() -> Flask:
    config = get_config()

    flask_app = Flask(__name__)

    CORS(flask_app, origins=config.cors_origins)

    flask_app.register_blueprint(v1_bp)

    @flask_app.errorhandler(404)
    def not_found(exc: Exception):
        return jsonify({"error": "Not Found"}), 404

    @flask_app.errorhandler(405)
    def method_not_allowed(exc: Exception):
        return jsonify({"error": "Method Not Allowed"}), 405

    @flask_app.errorhandler(500)
    def internal_error(exc: Exception):
        return jsonify({"error": "Internal Server Error"}), 500

    return flask_app


app = create_app()
