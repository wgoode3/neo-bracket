from flask import Flask, send_from_directory, jsonify, request
import os
from models.user import User, initialize

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REACT_DIR = os.path.join(BASE_DIR, "client/build")
STATIC_DIR = os.path.join(REACT_DIR, "static")


app = Flask(__name__, static_folder=STATIC_DIR)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bracket"
initialize(app)

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

@app.route("/session", methods=['GET', 'POST'])
def sessions():
    if request.method == 'POST':
        user = User(request.json, "login")
        if user.is_valid:
            return jsonify({"status": "daijoubu"})
        else:
            return jsonify({"errors": user.errors})
    elif request.method == 'GET':
        pass
    return jsonify({"status": "daijoubu"})

"""
catch all routes for sending the react index.html
"""
@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def send_react(path):
    file = os.path.join(REACT_DIR, path)
    if path != "" and os.path.exists(file):
        return send_from_directory(REACT_DIR, path)
    else:
        return send_from_directory(REACT_DIR, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)