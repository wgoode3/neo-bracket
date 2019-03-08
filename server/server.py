from flask import Flask, send_from_directory, jsonify, request
import os
from models.user import User

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REACT_DIR = os.path.join(BASE_DIR, "client/build")
STATIC_DIR = os.path.join(REACT_DIR, "static")

print("Project directory is", BASE_DIR)
print("React directory is", REACT_DIR)

app = Flask(__name__, static_folder=STATIC_DIR)

@app.route("/user", methods=['GET', 'POST'])
def example():
    if request.method == 'POST':
        print("we're getting a post request", request.json)
    elif request.method == 'GET':
        print("we're getting a get request")
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
    