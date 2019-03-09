from flask import jsonify, request
from ..models.user import User

def initialize(app):
    @app.route("/bracket/<_id>", methods=['GET', 'POST'])
    def bracket(_id):
        print(_id)
        if request.method == 'POST':
            print(request.json)
            User({"_id": _id}, "").set_bracket(request.json)
        elif request.method == 'GET':
            pass
        return jsonify({"status": "daijoubu"})