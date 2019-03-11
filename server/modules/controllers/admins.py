from flask import jsonify, request, session
from ..models.user import User


def initialize(app):
    @app.route("/api/admin", methods=['PUT', 'GET'])
    def admins():
        # this is being checked whether it is post or get
        _id = session.get("_id", None)
        is_admin = session.get("is_admin", False)
        if is_admin:
            user = User({"_id": _id}).get_one()
            if user and user["is_admin"]:
                
                if request.method == 'PUT':
                    User({"_id": _id}).set_bracket(request.json)
                    return jsonify({"status": "daijoubu"})
                elif request.method == 'GET':
                    return jsonify({"auth": True, "user": user})

    @app.route("/api/admin/score")
    def score():
        _id = session.get("_id", None)
        is_admin = session.get("is_admin", False)
        if is_admin and _id:
            User({"_id": _id}).score()
        return jsonify({"status": "daijoubu"})