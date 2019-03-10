from modules import app, REACT_DIR
from modules.models import user
from modules.controllers import users
from modules.controllers import sessions
from modules.controllers import brackets
from modules.controllers import admins
from modules.controllers import catch_all

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
    app.run(debug=True)