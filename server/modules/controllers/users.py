from flask import jsonify, request
from ..models.user import User

def initialize(app):
    @app.route("/users", methods=['GET', 'POST'])
    def users():
        if request.method == 'POST':
            user = User(request.json, "register")
            if user.is_valid:
                results = user.create()
                return jsonify({"status": "daijoubu", "user_id": results})
            else:
                return jsonify({"errors": user.errors})
        elif request.method == 'GET':
            # users = User({}, "").get_all()
            users = User().get_leaderboard()
            return jsonify({"status": "daijoubu", "users": users})

    @app.route("/users/<_id>", methods=['GET', 'POST'])
    def user(_id):
        # TODO: check if the get is ever used
        if request.method == 'POST':
            return jsonify({"status": "daijoubu"})
        elif request.method == 'GET':
            user = User({"_id":_id}).get_one()
            return jsonify({"status": "daijoubu", "user": user})