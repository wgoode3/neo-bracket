from modules import app, REACT_DIR
from modules.models import user
from modules.controllers import users, sessions, brackets, admins
from modules.utils import catch_all

# models
user.initialize(app)

# controllers
users.initialize(app)
sessions.initialize(app)
brackets.initialize(app)
admins.initialize(app)

# sends the react app
# make sure this is last
catch_all.initialize(app, REACT_DIR)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)