from server import app, REACT_DIR
from server.models import user
from server.controllers import users
from server.controllers import sessions
from server.controllers import catchall

user.initialize(app)
sessions.initialize(app)
users.initialize(app)
catchall.initialize(app, REACT_DIR)

if __name__ == "__main__":
    app.run(debug=True)