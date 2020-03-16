import pymysql
import json

import backend.Constant


class DatabaseConnection:
    __constant = backend.Constant
    __host = __constant.DATABASE_HOST
    __db = __constant.DATABASE_NAME
    __user = __constant.DATABASE_USER
    __password = __constant.DATABASE_PASSWORD
    __db_connection = None
    __instance = None

    @staticmethod
    def getInstance():
        if DatabaseConnection.__instance is None:
            DatabaseConnection()
        return DatabaseConnection.__instance

    def __init__(self):
        if DatabaseConnection.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            if self.__db_connection is None:
                self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)
            DatabaseConnection.__instance = self

    def get_all_school_data(self):
        cursor = self.__db_connection.cursor()
        sql = "SELECT sc.school_id, sc.school_name, pro.name, dist.name, sub.name FROM school as sc LEFT JOIN province as pro ON sc.province_id LIKE pro.province_id LEFT JOIN district as dist ON sc.district_id LIKE dist.district_id LEFT JOIN sub_district as sub ON sc.sub_district_id LIKE sub.sub_district_id"

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return False
        finally:
            self.__db_connection.close()

        out = []
        for school in result:
            data = {'school_id': school[0], 'school_name': school[1], 'province': school[2], 'district': school[3],
                    'subdistrict': school[4]}
            out.append(data)
        return out

    def get_school_by_id(self, school_id):
        cursor = self.__db_connection.cursor()
        sql = "SELECT sc.school_id, sc.school_name, pro.name, dist.name, sub.name FROM school as sc LEFT JOIN province as pro ON sc.province_id LIKE pro.province_id LEFT JOIN district as dist ON sc.district_id LIKE dist.district_id LEFT JOIN sub_district as sub ON sc.sub_district_id LIKE sub.sub_district_id WHERE sc.school_id like '" + str(
            school_id) + "'"

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %d" % (e.args[0], e.args[1]))
            return False
        finally:
            self.__db_connection.close()

        out = []
        for school in result:
            data = {'school_id': school[0], 'school_name': school[1], 'province': school[2], 'district': school[3],
                    'subdistrict': school[4]}
            out.append(data)

        return out

    def create_staff(self, staff_id, level, name, lastname, password):
        cursor = self.__db_connection.cursor()
        sql = "INSERT INTO staff (staff_id, level_id, firstname, lastname, password) VALUES ('" + str(
            staff_id) + "'," + str(level) + ", '" + str(name) + "','" + str(lastname) + "','" + str(password) + "')"

        try:
            cursor.execute(sql)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return False
        finally:
            self.__db_connection.close()

        return "Account was created"

    def get_user(self, username):
        cursor = self.__db_connection.cursor()
        sql = "select * from staff where staff_id like '" + str(username) + "'"
        cursor.execute(sql)
        result = cursor.fetchone()

        self.__db_connection.close()
        return result

    def get_branch(self):
        cursor = self.__db_connection.cursor()
        sql = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name from branch natural join has_branch natural join department as dept"

        out_response = {}

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            out_response['data'] = str(e.args[1])
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return out_response
        finally:
            self.__db_connection.close()

        out = []
        for branch in result:
            data = {'branch_id': branch[0], 'branch_name': branch[1], 'dept_id': branch[2], 'dept_name': branch[3]}
            out.append(data)

        out_response['response'] = True
        out_response['message'] = str("Query Successful")
        out_response['data'] = out

        return out_response

    def get_admission_data(self, branch, year, types, channel):
        cursor = self.__db_connection.cursor()

        if year is None:
            sql = "select application_no, firstname, lastname, branch, year, gender, gpax, school_id, decision from admission where branch = " + str(
                branch)
        elif types is None:
            sql = "select application_no, firstname, lastname, branch, year, gender, gpax, school_id, decision from admission where branch = " + str(
                branch) + " and year =" + str(year)
        elif channel is None:
            sql = "select application_no, firstname, lastname, branch, year, gender, gpax, school_id, decision from admission where branch = " + str(
                branch) + " and admission_type = " + str(types) + " and year = " + str(year)
        elif not year is None and not types is None and not channel is None:
            sql = "select application_no, firstname, lastname, branch, year, gender, gpax, school_id, decision from admission where branch = " + str(
                branch) + " and admission_type = " + str(
                types) + " and admission_channel = " + channel + " and year = " + str(year)
        else:
            sql = "select application_no, firstname, lastname, branch, year, gender, gpax, school_id, decision from admission"

        out_response = {}

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            out_response['data'] = str(e.args[1])
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return out_response
        finally:
            self.__db_connection.close()

        out = []
        for data in result:
            data = {'application_no': data[0], 'firstname': data[1], 'lastname': data[2], 'branch': data[3],
                    'year': data[4], 'gender': data[5],
                    'gpax': str(data[6]), 'school_id': data[7], 'decision': data[8]}
            out.append(data)

        out_response['response'] = True
        out_response['message'] = str("Query Successful")
        out_response['data'] = out

        return out_response

    # get all student data (pueng request)
    def get_all_student(self):
        cursor = self.__db_connection.cursor()
        sql = "select student_id, dept_name, branch_name, current_gpax from student natural join study_in natural join has_branch natural join branch natural join department"

        out_response = {}

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
            print(result)
        except pymysql.Error as e:
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            out_response['data'] = str(e.args[1])
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return out_response
        finally:
            self.__db_connection.close()

        out = []

        for data in result:
            data = {'student_id': data[0], 'department': data[1], 'branch': data[2], 'current_gpax': data[3]}
            out.append(data)

        out_response['response'] = True
        out_response['message'] = str("Query Successful")
        out_response['data'] = out
        # print(out_response)
        return out_response

    # get all student academic record (pueng request)
    def get_all_academic_record(self):
        cursor = self.__db_connection.cursor()
        sql = "select * from academic_record"

        out_response = {}

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            out_response['data'] = str(e.args[1])
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return out_response
        finally:
            self.__db_connection.close()

        out = []

        for data in result:
            data = {'student_id': data[1], 'subject_code': data[2], 'semester': data[3], 'education_year': data[4],
                    'grade': data[5]}
            out.append(data)

        out_response['response'] = True
        out_response['message'] = str("Query Successful")
        out_response['data'] = out

        return out_response

    # get alumni data (aom request)
    def get_all_alumni(self):
        cursor = self.__db_connection.cursor()
        sql = "select student_id, branch.branch_name as branch, graduated_gpax, congrat_year, work_status.status_title as work_status, company, salary from (alumni left join branch on alumni.branch_id = branch.branch_id) left join work_status on alumni.work_status = work_status.status_id"

        out_response = {}

        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except pymysql.Error as e:
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            out_response['data'] = str(e.args[1])
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return out_response
        finally:
            self.__db_connection.close()

        out = []

        for data in result:
            data = {'student_id': data[0], 'branch': data[1], 'graduated_gpax': data[2], 'congrat_year': data[3],
                    'work_status': data[4], 'company': data[5], 'salary': data[6]}
            out.append(data)

        out_response['response'] = True
        out_response['message'] = str("Query Successful")
        out_response['data'] = out

        return out_response
