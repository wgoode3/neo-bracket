print("this is user.py")

class Collection:
    def __init__(self):
        attrs = [attr for attr in dir(self) if not attr.startswith("__")]
        attrs.remove("objects")
        fields = {attr: self.__getattribute__(attr) for attr in attrs}
        print("Classname:")
        print(str(self.__class__)[8:-2].split(".")[-1])
        print("Columns:")
        print(fields)
        
    def objects(self):
        pass

class User(Collection):
    username = str
    email = str
    is_admin = bool
    password = str

# User()