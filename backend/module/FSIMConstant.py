class FSIMConstant:

    __host = "localhost"
    __db = "fsim"
    __user_db = "root"
    __password_db = ""

    def get_host(self):
        return self.__host

    def get_db(self):
        return self.__db

    def get_user_db(self):
        return self.__user_db

    def get_password_db(self):
        return self.__password_db
