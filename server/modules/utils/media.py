from flask import send_from_directory
import os


def initialize(app, media_directory):
    @app.route("/media/<path:path>")
    def serve_media(path):
        file = os.path.join(media_directory, path)
        if path != "" and os.path.exists(file):
            return send_from_directory(media_directory, path)
        else:
            print("unable to find", path)
            return send_from_directory(media_directory, "default.png")