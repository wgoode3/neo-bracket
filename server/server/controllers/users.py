from flask import jsonify, request
from ..models.user import User

def initialize(app):
    @app.route("/users", methods=['GET', 'POST'])
    def users():
        if request.method == 'POST':
            user = User(request.json, "register")
            if user.is_valid:
                results = user.create()
                return jsonify({"status": "daijoubu"})
            else:
                return jsonify({"errors": user.errors})
        elif request.method == 'GET':
            users = User({}, "").get_all()
        return jsonify({"status": "daijoubu", "users": users})