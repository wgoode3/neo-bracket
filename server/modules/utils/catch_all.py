from flask import send_from_directory
import os

# gotta catch 'em all
def initialize(app, react_location):
    @app.route("/", defaults={'path': ''})
    @app.route("/<path:path>")
    def send_react(path):
        file = os.path.join(react_location, path)
        if path != "" and os.path.exists(file):
            return send_from_directory(react_location, path)
        else:
            return send_from_directory(react_location, 'index.html')