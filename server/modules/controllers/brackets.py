from flask import jsonify, request
from ..models.user import User

def initialize(app):
    @app.route("/bracket/<_id>", methods=['POST'])
    def bracket(_id):
        User({"_id": _id}).set_bracket(request.json)
        return jsonify({"status": "daijoubu"})