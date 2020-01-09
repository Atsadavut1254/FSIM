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
        sql = "SELECT sc.school_id, sc.school_name, pro.name, dist.name, sub.name FROM school as sc LEFT JOIN province as pro ON sc.province_id LIKE pro.province_id LEFT JOIN district as dist ON sc.district_id LIKE dist.district_id LEFT JOIN sub_district as sub ON sc.sub_district_id LIKE sub.sub_district_id"
        cursor.execute(sql)
        result = cursor.fetchall()

        out = []
        for school in result:
            data = {'school_id': school[0], 'school_name': school[1], 'province': school[2], 'district': school[3], 'subdistrict': school[4]}
            out.append(data)

        self.__db_connection.close()
        return out
