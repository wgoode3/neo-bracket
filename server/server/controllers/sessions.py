from flask import jsonify, request
from ..models.user import User

def initialize(app):
    @app.route("/session", methods=['GET', 'POST'])
    def sessions():
        if request.method == 'POST':
            user = User(request.json, "login")
            if user.is_valid:
                return jsonify({"status": "daijoubu", "user": user.data})
            else:
                return jsonify({"errors": user.errors})
        elif request.method == 'GET':
            return jsonify({"status": "daijoubu"})