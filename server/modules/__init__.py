from flask import Flask
from datetime import datetime
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MEDIA_DIR = os.path.join(BASE_DIR, "avatars")
REACT_DIR = os.path.join(BASE_DIR, "client/build")
STATIC_DIR = os.path.join(REACT_DIR, "static")
TOURNAMENT_START = datetime.strptime("2019-03-21 12:15", "%Y-%m-%d %H:%M")


app = Flask(__name__, static_folder=STATIC_DIR)
app.secret_key = "poiugvchdbjsqwemjsd"
app.config["MONGO_URI"] = "mongodb://localhost:27017/bracket"
# images should be less than 1MB, but base64 encoded
# this hopefully should be large enough
app.config['MAX_CONTENT_LENGTH'] = 1.5e6