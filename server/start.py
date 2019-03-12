from modules import app, REACT_DIR, MEDIA_DIR, TOURNAMENT_START
from modules.models import user
from modules.controllers import admins, brackets, sessions, users
from modules.utils import catch_all, media

# models
user.initialize(app, MEDIA_DIR, TOURNAMENT_START)

# controllers
admins.initialize(app)
brackets.initialize(app)
sessions.initialize(app)
users.initialize(app)

# sends images from /media
media.initialize(app, MEDIA_DIR)

# sends the react app
# make sure this is last
catch_all.initialize(app, REACT_DIR)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)