from flask import jsonify, request, session
from ..models.user import User


def initialize(app):
    @app.route("/api/session", methods=['POST', 'DELETE'])
    def sessions():
        if request.method == 'POST':
            user = User(request.json, "login")
            if user.is_valid:
                return jsonify({"status": "ok", "user": user.data})
            else:
                return jsonify({"errors": user.errors})
        elif request.method == 'DELETE':
            session.clear()
            return jsonify({"status": "ok"})
    