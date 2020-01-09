import pymysql
import json

# import our module
from backend.module.FSIMConstant import FSIMConstant


class DatabaseConnection:
    __constant = FSIMConstant()
    __host = __constant.get_host()
    __db = __constant.get_db()
    __user = __constant.get_user_db()
    __password = __constant.get_password_db()
    __db_connection = None

    def __init__(self):
        self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)

    def get_all_school_data(self):
        cursor = self.__db_connection.cursor()
        sql = "select * from school"
        cursor.execute(sql)
        result = cursor.fetchall()

        out = []
        for school in result:
            data = {'school_id': school[0], 'school_name': school[1]}
            out.append(data)

        return out
