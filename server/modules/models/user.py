from flask_pymongo import PyMongo
from flask import session
from datetime import datetime
import base64, bcrypt, bson, json, os, re, time

EMAIL_CHECK = re.compile(r"^[^@]+@[^@]+\.[^@]+$")
ALLOWED_EXTENSIONS = ('jpg', 'jgeg', 'png', 'gif')


def initialize(app, media_dir, tournament_start):
    global mongo
    mongo = PyMongo(app)
    global MEDIA_DIR
    MEDIA_DIR = media_dir
    global TOURNAMENT_START
    TOURNAMENT_START = tournament_start

class User:
    def __init__(self, form_data={}, action=""):
        self._id = form_data.get("_id", "")
        self.first_name = form_data.get("first_name", "")
        self.last_name = form_data.get("last_name", "")
        self.location = form_data.get("location", "")
        self.email = form_data.get("email", "").lower()
        self.password = form_data.get("password", "")
        self.confirm = form_data.get("confirm", "")
        self.file_name = form_data.get("file_name", "")
        self.image = form_data.get("image", "")
        self.avatar = form_data.get("avatar", "")
        self.is_admin = False
        if action == "register":
            self.is_valid, self.errors = self.__validate_register()
        elif action == "login":
            self.is_valid, self.errors, self.data = self.__validate_login()
        elif action == "update":
            self.is_valid, self.errors = self.__validate_update()

    def __validate_register(self):
        valid = True
        errors = {}

        if len(self.first_name) < 1:
            errors["first_name"] = "First name is required"
        elif len(self.first_name) < 2:
            errors["first_name"] = "First name must be 2 characters or longer"
        
        if len(self.last_name) < 1:
            errors["last_name"] = "Last name is required"
        elif len(self.last_name) < 2:
            errors["last_name"] = "Last name must be 2 characters or longer"
        
        if len(self.email) < 1:
            errors["email"] = "Email is required"
        elif not EMAIL_CHECK.match(self.email):
            errors["email"] = "Please enter a valid email"
        else:
            result = mongo.db.users.find({"email": self.email})
            users = [user for user in result]
            if len(users) > 0:
                errors["email"] = "Email already exists"
        
        if len(self.password) < 1:
            errors["password"] = "Password is required"
        elif len(self.password) < 8:
            errors["password"] = "Password must be 8 characters or longer"
        
        if len(self.confirm) < 1:
            errors["confirm"] = "Confirm Password is required"
        elif self.password != self.confirm:
            errors["confirm"] = "Confirm Password must match Password"

        valid = len(errors) == 0
        return (valid, errors)

    def __validate_login(self):
        valid = True
        errors = {}
        user = None

        if len(self.email) < 1:
            errors["email"] = "Email is required"
        elif not EMAIL_CHECK.match(self.email):
            errors["email"] = "Please enter a valid email"
        else:
            result = mongo.db.users.find({"email": self.email})
            users = [user for user in result]
            if len(users) == 0:
                errors["email"] = "Unknown email"
            else:
                user = users[0]
                user["_id"] = str(user["_id"])

        if len(self.password) < 1:
            errors["password"] = "Password is required"
        elif len(self.password) < 8:
            errors["password"] = "Password must be 8 characters or longer"
        else:
            if not bcrypt.checkpw(self.password.encode(), user['password'].encode()):
                errors["password"] = "Incorrect Password"

        if len(errors) > 0:
            valid = False
        else:
            if user["is_admin"]:
                session["_id"] = user["_id"]
                session["is_admin"] = True
        return (valid, errors, user)

    def __validate_update(self):
        valid = True
        errors = {}

        if len(self.first_name) < 1:
            errors["first_name"] = "First name is required"
        elif len(self.first_name) < 2:
            errors["first_name"] = "First name must be 2 characters or longer"
        
        if len(self.last_name) < 1:
            errors["last_name"] = "Last name is required"
        elif len(self.last_name) < 2:
            errors["last_name"] = "Last name must be 2 characters or longer"
        
        if len(self.email) < 1:
            errors["email"] = "Email is required"
        elif not EMAIL_CHECK.match(self.email):
            errors["email"] = "Please enter a valid email"
        else:
            result = mongo.db.users.find({"email": self.email})
            users_with_email = [user for user in result if str(user["_id"]) != self._id]
            if len(users_with_email) > 0:
                errors["email"] = "Email already exists"

        valid = len(errors) == 0
        return (valid, errors)

    def create(self):
        result = None
        if self.is_valid:
            result = mongo.db.users.insert({
                "first_name": self.first_name,
                "last_name": self.last_name,
                "location": self.location,
                "email": self.email,
                "password": bcrypt.hashpw(self.password.encode(), bcrypt.gensalt()).decode(),
                "avatar": "default.png",
                "is_admin": False,
                "bracket_complete": False,
                "for_fun": False,
                "bracket": [],
                "score": 0,
                "rank": 0
            })
            result = str(result)
        # we get the user's _id back as an object_id
        return result

    def get_leaderboard(self):
        # get all the users who aren't the admin
        match = {"is_admin": False}
        # only the fields that should be sent back
        # don't sent email or password
        fields = {
            "first_name": 1,
            "last_name": 1,
            "location": 1, 
            "avatar": 1,
            "bracket": 1,
            "bracket_complete": 1,
            "score": 1,
            "rank": 1
        }
        users = [user for user in mongo.db.users.find(match, fields)]
        # I don't want to send the _id out either
        for i in range(len(users)):
            users[i].pop('_id', None)
        return sorted(users, key=lambda u: -u["score"])
        

    def get_one(self):
        results = mongo.db.users.find({"_id": bson.objectid.ObjectId(self._id)})
        users = [user for user in results]
        if len(users) > 0:
            user = users[0]
            user["_id"] = str(user["_id"])
            return user
        else:
            return None

    def update(self):
        if self.file_name and self.image:
            extension = self.file_name.split('.')[-1].lower()
            if extension in ALLOWED_EXTENSIONS:
                file_name = str(time.time()).split(".")[0] + "." + extension
                img_path = os.path.join(MEDIA_DIR,  file_name)
                with open(img_path, 'wb') as img:
                    img.write(base64.b64decode(self.image.split(',')[-1]))
                    # delete previous image if user is changing from not default
                    if self.avatar != "default.png":
                        os.remove(os.path.join(MEDIA_DIR, self.avatar))
                    self.avatar = file_name
        return mongo.db.users.update(
            {
                "_id": bson.objectid.ObjectId(self._id)
            }, 
            {
                "$set": {
                    "first_name": self.first_name,
                    "last_name": self.last_name,
                    "location": self.location,
                    "email": self.email,
                    "avatar": self.avatar
                }
            }
        )

    def set_bracket(self, bracket):
        b = { "bracket_complete": True, "bracket": bracket }
        """
        If the user fills out the bracket after tournament start, 
        mark it as "for fun" so it doesn't get scored
        """
        if(datetime.now() > TOURNAMENT_START):
            b["for_fun"] = True
        return mongo.db.users.update(
            { "_id": bson.objectid.ObjectId(self._id) }, 
            { "$set": b }
        )
    
    def score(self):
        results = mongo.db.users.find({"_id": bson.objectid.ObjectId(self._id)})
        bracket = results[0]['bracket']
        # remove admin, unfinished, or brackets after tournament start
        to_score = {"for_fun": False, "bracket_complete": True, "is_admin": False}
        users = [user for user in mongo.db.users.find(to_score)]

        # score the brackets against the admin's bracket
        for user in users:
            score = 0
            for i in range(len(bracket)):
                # so it doesn't break when scoring not yet complete tournament
                if bracket[i]["winner"]:
                    if bracket[i]["winner"]["id"] == user["bracket"][i]["winner"]["id"]:
                        score += 2 ** (6-bracket[i]["round"])
            # print(user["first_name"], ":", score)
            mongo.db.users.update(
                { "_id": bson.objectid.ObjectId(user["_id"]) }, 
                { "$set": { "score": score } }
            )

        # assign ranks to users
        users = [user for user in mongo.db.users.find(to_score)]
        users = sorted(users, key=lambda u: -u["score"])
        rank = 0
        num_consecutive = 1
        prev_score = 0
        for user in users:

            if user["score"] == prev_score:
                num_consecutive += 1
            else:
                prev_score = user["score"]
                rank += num_consecutive
                num_consecutive = 1

            mongo.db.users.update(
                { "_id": bson.objectid.ObjectId(user["_id"]) }, 
                { "$set": { "rank": rank } }
            )
