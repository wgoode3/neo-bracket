from flask import jsonify, request
from ..models.user import User


def initialize(app):
    @app.route("/api/users", methods=['GET', 'POST'])
    def users():
        if request.method == 'POST':
            user = User(request.json, "register")
            if user.is_valid:
                results = user.create()
                return jsonify({"status": "ok", "user_id": results})
            else:
                return jsonify({"errors": user.errors})
        elif request.method == 'GET':
            users = User().get_leaderboard()
            return jsonify({"status": "ok", "users": users})

    @app.route("/api/users/<_id>", methods=['GET', 'PUT'])
    def user(_id):
        if request.method == 'PUT':
            user = User(request.json, "update")
            if user.is_valid:
                user.update()
                return jsonify({"status": "ok"})
            else:
                return jsonify({"errors": user.errors})
        elif request.method == 'GET':
            user = User({"_id":_id}).get_one()
            return jsonify({"status": "ok", "user": user})