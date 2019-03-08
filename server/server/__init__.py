from flask import Flask
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REACT_DIR = os.path.join(BASE_DIR, "client/build")
STATIC_DIR = os.path.join(REACT_DIR, "static")

app = Flask(__name__, static_folder=STATIC_DIR)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bracket"