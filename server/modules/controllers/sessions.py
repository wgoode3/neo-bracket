from flask import jsonify, request, session
from ..models.user import User

def initialize(app):
    @app.route("/session", methods=['POST'])
    def sessions():
        user = User(request.json, "login")
        if user.is_valid:
            return jsonify({"status": "daijoubu", "user": user.data})
        else:
            return jsonify({"errors": user.errors})
    
    # maybe implement this as a DELETE method of session
    @app.route("/api/logout")
    def logout():
        session.clear()
        return jsonify({"status": "daijoubu"})