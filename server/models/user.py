from flask_pymongo import PyMongo
import bcrypt, bson, json, re

EMAIL_CHECK = re.compile(r"^[^@]+@[^@]+\.[^@]+$")


def initialize(app):
    global mongo
    mongo = PyMongo(app)

class User:
    def __init__(self, form_data, action):
        self._id = form_data.get("_id", "")
        self.first_name = form_data.get("first_name", "")
        self.last_name = form_data.get("last_name", "")
        self.location = form_data.get("location", "")
        self.email = form_data.get("email", "")
        self.password = form_data.get("password", "")
        self.confirm = form_data.get("confirm", "")
        if action == "register":
            self.is_valid, self.errors = self.__validate_register()
        elif action == "login":
            self.is_valid, self.errors = self.__validate_login()

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

        if len(self.email) < 1:
            errors["email"] = "Email is required"
        elif not EMAIL_CHECK.match(self.email):
            errors["email"] = "Please enter a valid email"
        
        if len(self.password) < 1:
            errors["password"] = "Password is required"
        elif len(self.password) < 8:
            errors["password"] = "Password must be 8 characters or longer"

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
                "avatar": "default",
                "is_admin": False,
                "backet_complete": False,
                "bracket": [],
                "score": 0
            })
        return result

    def get_all(self):
        users = [user for user in mongo.db.users.find({})]
        for i in range(len(users)):
            users[i]["_id"] = str(users[i]["_id"])
        return users
