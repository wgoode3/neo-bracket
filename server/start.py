from server import app, REACT_DIR
from server.models import user
from server.controllers import users
from server.controllers import sessions
from server.controllers import brackets
from server.controllers import catch_all

user.initialize(app)
users.initialize(app)
sessions.initialize(app)
brackets.initialize(app)
catch_all.initialize(app, REACT_DIR)

if __name__ == "__main__":
    app.run(debug=True)