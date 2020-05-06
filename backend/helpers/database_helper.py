import pymysql
import json
from datetime import datetime

# import project constant
import backend.Constant

# import helper
import backend.helpers.inner_response_helper as inner_res_helper


class DatabaseHelper:
    # class attribute
    __constant = backend.Constant
    __host = __constant.DATABASE_HOST
    __db = __constant.DATABASE_NAME
    __user = __constant.DATABASE_USER
    __password = __constant.DATABASE_PASSWORD
    __db_connection = None
    __instance = None
    __cursor = None

    def __init__(self):
        self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)
        self.__cursor = self.__db_connection.cursor()

    # change epoch time to string format 2020-01-01
    def __change_time_epoch_to_string(self, time):
        convert = datetime.fromtimestamp(int(time)).strftime("%Y-%m-%d")
        return str(convert)

    # change list ton insert format
    def __change_to_list_no_time(self, load):
        output_list = []
        for data in load:
            temp = list(data.values())
            temp = list(map(str, temp))
            output_list.append(tuple(temp))
        return output_list

    def __change_to_list_with_time_columns(self, load, time_cols_index):
        output_list = []
        for data in load:
            temp = list(data.values())
            # convert epoch time to string
            if isinstance(time_cols_index, list):
                for i in time_cols_index:
                    temp[i] = self.__change_time_epoch_to_string(temp[i])
            else:
                temp[time_cols_index] = self.__change_time_epoch_to_string(temp[time_cols_index])
            temp = list(map(str, temp))
            output_list.append(tuple(temp))
        return output_list

    # insert data to database function
    def __multiple_insert(self, table, column, data, has_time=False, time_cols=None):
        sql_command = "insert into %s (%s) values (%s)" % (table, ','.join(column), ','.join('%s' for _ in column))
        if has_time:
            insert_list = self.__change_to_list_with_time_columns(data, time_cols)
        else:
            insert_list = self.__change_to_list_no_time(data)

        self.__cursor.executemany(sql_command, insert_list)
        self.__db_connection.commit()

    # insert data with correctly form
    # insert multiple value
    def __insert_multiple_into(self, table, column, data):
        sql_command = "insert into %s (%s) values (%s)" % (table, ','.join(column), ','.join('%s' for _ in column))
        self.__cursor.executemany(sql_command, data)
        self.__db_connection.commit()

    # insert single value
    def __insert_into(self, table, column, data):
        sql_command = "insert into %s (%s) values (%s)" % (table, ','.join(column), ','.join('%s' for _ in column))
        self.__cursor.execute(sql_command, data)
        self.__db_connection.commit()

    # execute query function
    def __execute_query(self, sql_command):
        try:
            self.__cursor.execute(sql_command)
            result = self.__cursor.fetchall()
            return inner_res_helper.make_inner_response(True, "Success", result)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

    # execute delete function
    def __execute_delete(self, sql_command):
        self.__cursor.execute(sql_command)
        self.__db_connection.commit()

    # execute delete multiple function
    def __execute_delete_multiple(self, table, column, data):
        sql_command = "delete from %s where %s like %s" % (table, column, '%s')
        self.__cursor.executemany(sql_command, data)
        self.__db_connection.commit()

    # TODO() get user for authentication
    # get user
    def get_user(self, username: str = None):
        if username is None:
            return inner_res_helper.make_inner_response(response=False, message="No username input.",
                                                        value="No username input")

        sql_command = "select staff_id, level_id, firstname, lastname from staff where staff_id like '%s'" % username
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return inner_res_helper.make_inner_response(response=False, message="User not found",
                                                        value="User not found")

        return execute

    # get user for auth (have password)
    def get_user_for_auth(self, username: str = None):
        if username is None:
            return inner_res_helper.make_inner_response(response=False, message="No username input.",
                                                        value="No username input")

        sql_command = "select staff_id, level_id, firstname, lastname, password from staff where staff_id like '%s'" % username
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return inner_res_helper.make_inner_response(response=False, message="User not found",
                                                        value="User not found")

        return execute

    # create user
    def create_user(self, staff_id: str = None, first_name: str = None, last_name: str = None, hashed_pass: str = None,
                    staff_level: int = -1, ):
        if staff_id is None or first_name is None or last_name is None or hashed_pass is None:
            return inner_res_helper.make_inner_response(response=False, message="Some argument is None",
                                                        value="Some argument is None")

        try:
            self.__insert_into(table="staff", column=["staff_id", "level_id", "firstname", "lastname", "password"],
                               data=[staff_id, staff_level, first_name, last_name, hashed_pass])
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Success", "User was created")

        # TODO() # # # # manage data for admin part # # # # #

    # admission part
    def insert_admission(self, data):
        # prepare receive data
        admission_table = data['admission_table']
        admission_table = json.loads(admission_table)
        admission_table = list(admission_table.values())
        admission_branch = data['admission_branch']
        admission_branch = json.loads(admission_branch)
        admission_branch = list(admission_branch.values())
        admission_from = data['admission_from']
        admission_from = json.loads(admission_from)
        admission_from = list(admission_from.values())
        admission_studied = data['admission_studied']
        admission_studied = json.loads(admission_studied)
        admission_studied = list(admission_studied.values())

        try:
            self.__multiple_insert(table="admission",
                                   column=['application_no', 'firstname', 'lastname', 'gender', 'decision',
                                           'admission_year', 'upload_date'], data=admission_table, has_time=True,
                                   time_cols=6)
            self.__multiple_insert(table="admission_in_branch", column=['application_no', 'branch_id'],
                                   data=admission_branch)
            self.__multiple_insert(table="admission_from", column=['application_no', 'channel_id'], data=admission_from)
            self.__multiple_insert(table="admission_studied", column=['application_no', 'gpax', 'school_id'],
                                   data=admission_studied)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # academic part
    # insert academic record
    def insert_academic_record(self, academic_data):
        try:
            self.__insert_multiple_into(table="academic_record",
                                        column=['student_id', 'subject_code', 'semester', 'year', 'grade'],
                                        data=academic_data)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # insert gpa record
    def insert_gpa_record(self, gpa_data):
        try:
            self.__insert_multiple_into(table="gpa_record",
                                        column=['student_id', 'gpa', 'semester', 'year'],
                                        data=gpa_data)
        except Exception as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # insert new student
    def insert_new_student_data(self, data):
        # prepare receive data
        student_table = data['student']
        student_table = json.loads(student_table)
        student_table = list(student_table.values())

        entrance_table = data['entrance']
        entrance_table = json.loads(entrance_table)
        entrance_table = list(entrance_table.values())

        graduated_table = data['graduated']
        graduated_table = json.loads(graduated_table)
        graduated_table = list(graduated_table.values())

        has_status_table = data['has_status']
        has_status_table = json.loads(has_status_table)
        has_status_table = list(has_status_table.values())

        study_in_table = data['study_in']
        study_in_table = json.loads(study_in_table)
        study_in_table = list(study_in_table.values())

        try:
            self.__multiple_insert(table="student",
                                   column=['student_id', 'firstname', 'lastname', 'gender'],
                                   data=student_table)
            self.__multiple_insert(table="entrance", column=['student_id', 'application_no'],
                                   data=entrance_table)
            self.__multiple_insert(table="graduated",
                                   column=['student_id', 'school_id', 'gpax'],
                                   data=graduated_table)
            self.__multiple_insert(table="has_status",
                                   column=['student_id', 'status_id'],
                                   data=has_status_table)
            self.__multiple_insert(table="study_in",
                                   column=['student_id', 'branch_id'],
                                   data=study_in_table)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # delete all student by year
    def delete_student_by_year(self, year: str):
        year = str(year)

        if year is None:
            return inner_res_helper.make_inner_response(response=False,
                                                        message="No delete year input.",
                                                        value="No delete year input")

        year = year[2:]

        sql_command_study_in = "delete from study_in where student_id like '{}%'".format(year)
        sql_command_has_status = "delete from has_status where student_id like '{}%'".format(year)
        sql_command_entrance = "delete from entrance where student_id like '{}%'".format(year)
        sql_command_graduated = "delete from graduated where student_id like '{}%'".format(year)
        sql_command_gpa_record = "delete from gpa_record where student_id like '{}%'".format(year)
        sql_command_academic_record = "delete from academic_record where student_id like '{}%'".format(year)
        sql_command_student = "delete from student where student_id like '{}%'".format(year)

        try:
            self.__execute_delete(sql_command_study_in)
            self.__execute_delete(sql_command_has_status)
            self.__execute_delete(sql_command_entrance)
            self.__execute_delete(sql_command_graduated)
            self.__execute_delete(sql_command_gpa_record)
            self.__execute_delete(sql_command_academic_record)
            self.__execute_delete(sql_command_student)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # get all student data (pueng)
    def get_all_student(self, dept_id=None):
        if dept_id is not None:
            sql_command = "select student_id, dept_name, branch_name, current_gpax, status_id, dept_id, branch_id from student natural join study_in natural join has_branch natural join branch natural join department NATURAL JOIN has_status where dept_id like '%s'" % dept_id
        else:
            sql_command = "select student_id, dept_name, branch_name, current_gpax, status_id, dept_id, branch_id from student natural join study_in natural join has_branch natural join branch natural join department NATURAL JOIN has_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []

        for data in execute['value']:
            year = data[0]
            year = year[:2]
            year = self.__constant.calculate_education_year(year)
            data = {
                'student_id': data[0],
                'dept_id': data[5],
                'department': data[1],
                'branch_id': data[6],
                'branch': data[2],
                'current_gpax': data[3],
                'education_status': data[4],
                'student_year': year
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

        # get all student data (pueng)

    def get_student_tracking(self, id_student):

        sql_command = "SELECT gpa, semester, current_gpax, education_year FROM `gpa_record` NATURAL JOIN student where student_id='%s'" % id_student
        execute = self.__execute_query(sql_command)
        print(sql_command)
        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            data = {
                'gpa': data[0],
                'semester': data[1],
                'current_gpax': data[2],
                'education_year': data[3]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get all student academic record (pueng)
    def get_all_academic_record(self, dept_id=None, year=None):
        if dept_id is None and year is None:
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id from academic_record NATURAL JOIN has_status NATURAL JOIN study_in NATURAL JOIN has_branch"
        elif dept_id is not None and year is None:
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id from academic_record NATURAL JOIN has_status NATURAL JOIN study_in NATURAL JOIN has_branch WHERE dept_id like '%s'" % dept_id
        elif year is not None and dept_id is None:
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id from academic_record NATURAL JOIN has_status NATURAL JOIN study_in NATURAL JOIN has_branch WHERE education_year like '%s'" % year
        else:
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id from academic_record NATURAL JOIN has_status NATURAL JOIN study_in NATURAL JOIN has_branch WHERE education_year like '%s' and dept_id like '%s'" % (
                year, dept_id)
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            data = {
                'student_id': data[0],
                'subject_code': data[1],
                'semester': data[2],
                'education_year': data[3],
                'grade': data[4],
                'education_status': data[5],
                'branch_id': data[6]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get alumni data (aom request)
    def get_all_alumni(self, graduated_year: int = None):
        if graduated_year is None:
            sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name FROM alumni NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice NATURAL JOIN apprentice_status NATURAL JOIN department"
        else:
            sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name FROM alumni NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice NATURAL JOIN apprentice_status NATURAL JOIN department WHERE graduated_year = '%s'" % (
                graduated_year)
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            data = {
                'student_id': data[0],
                'branch_id': data[1],
                'branch_name': data[2],
                'dept_id': data[10],
                'dept_name': data[11],
                'graduated_gpax': data[3],
                'congrat_year': data[4],
                'work_id': data[5],
                'work_status': data[6],
                'salary': data[7],
                'apprentice_id': data[8],
                'apprentice_title': data[9]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

        # get all admission data (pueng)

    def get_all_admission(self, year=None):
        if year is not None:
            sql_command = "select channel_name , admission_year ,branch_id,school_id from admission  NATURAL JOIN admission_from  NATURAL JOIN admission_in_branch NATURAL JOIN admission_channel NATURAL JOIN admission_studied where admission_year like '%s' or admission_year like '%s' " % (
                year, int(year) - 1)
        else:
            sql_command = "select channel_name , admission_year ,branch_id,school_id  from admission  NATURAL JOIN admission_from  NATURAL JOIN admission_in_branch  NATURAL JOIN admission_channel NATURAL JOIN admission_studied "
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute
        out_function_data = []
        for data in execute['value']:
            data = {
                'channel_name': data[0],
                'admission_year': data[1],
                'branch_id': data[2],
                'school_id': data[3],

            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get all activity NOT ActivityActiveRecruitment (pueng)
    def get_admission_publicize(self, year=None):
        if year is not None:
            sql_command = "SELECT activity_id,activity_year,activity_budget,student_id FROM `activity_notar` NATURAL JOIN activity NATURAL LEFT JOIN joined_notar where activity_year like '%s' or activity_year like '%s' " % (
                year, int(year) - 1)
        else:
            sql_command = "SELECT activity_id,activity_year,activity_budget,student_id FROM `activity_notar` NATURAL JOIN activity NATURAL LEFT JOIN joined_notar"

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute
        out_function_data = []
        for data in execute['value']:
            data = {
                'activity_id': data[0],
                'activity_year': data[1],
                'activity_budget': data[2],
                'student_id': data[3]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get all activity  ActivityActiveRecruitment (pueng)
    def get_admission_ar(self, year=None):
        if year is not None:
            sql_command = "SELECT activity_id,school_name,branch_name,gpax,activity_year FROM `activity_ar`NATURAL JOIN activity where activity_year like '%s' " % (
                year)
        else:
            sql_command = "SELECT activity_id,school_name,branch_name,gpax,activity_year FROM `activity_ar`NATURAL JOIN activity"

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute
        out_function_data = []
        for data in execute['value']:
            data = {
                'activity_id': data[0],
                'school_name': data[1],
                'branch_name': data[2],
                'gpax': data[3],
                'activity_year': data[4]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # TODO() # # # # general path # # # # #

    def get_department(self, name):
        if name is None:
            sql_command = "SELECT count(branch_id) as student_amount, branch_id, branch_name, dept_id, dept_name FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN department NATURAL JOIN branch GROUP BY branch_id ORDER BY dept_id ASC"
        else:
            sql_command = "SELECT count(branch_id) as student_amount, branch_id, branch_name, dept_id, dept_name FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN department NATURAL JOIN branch WHERE dept_id like '%s' GROUP BY branch_id ORDER BY dept_id ASC" % (
                name)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []

        cur_dept = None
        for dept in execute['value']:
            if dept[3] != cur_dept:
                cur_dept = dept[3]
                temp = {
                    'dept_id': dept[3],
                    'dept_name': dept[4],
                    'branch': []
                }
                out_function_data.append(temp)

        cur_dept = execute['value'][0][3]
        count = 0

        for branch in execute['value']:
            dept = branch[3]
            if dept != cur_dept:
                cur_dept = dept
                count += 1

            temp = {
                'branch_id': branch[1],
                'branch_name': branch[2],
                'amount_student': branch[0]
            }

            out_function_data[count]['branch'].append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    def get_branch(self, branch_id=None):
        if branch_id is None:
            sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, has_branch_id from branch natural join has_branch natural join department as dept"
        else:
            sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, has_branch_id from branch natural join has_branch natural join department as dept where branch_id like '%s'" % (
                branch_id)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for branch in execute['value']:
            data = {
                'branch_id': branch[0],
                'branch_name': branch[1],
                'dept_id': branch[2],
                'dept_name': branch[3],
                'has_branch_id': branch[4]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)

    def get_admission_channel(self):
        sql_command = "select * from admission_channel"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for channel in execute['value']:
            data = {
                'channel_id': channel[0],
                'channel_name': channel[1]
            }
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)

    # get student data by department
    def get_department_student_data(self, dept_id):
        sql_command = "SELECT student_id, current_gpax, branch_id, status_id FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN department NATURAL JOIN has_status WHERE dept_id like '%s'" % (
            str(dept_id))
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            year = data[0]
            year = year[:2]
            year = self.__constant.calculate_education_year(year)
            temp = {
                'student_id': data[0],
                'current_gpax': data[1],
                'branch_id': data[2],
                'status_id': data[3],
                'education_year': year
            }
            out_function_data.append(temp)
        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get student in department by status
    def get_student_status(self, dept_id, status_id):
        sql_command = "SELECT student_id, firstname, lastname, current_gpax, branch_name, branch_id FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN department NATURAL JOIN has_status WHERE dept_id = %s and status_id = %s" % (
            str(dept_id), str(status_id))
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            year = data[0]
            year = year[:2]
            year = self.__constant.calculate_education_year(year)
            temp = {
                'student_id': data[0],
                'firstname': data[1],
                'lastname': data[2],
                'current_gpax': data[3],
                'branch_name': data[4],
                'education_year': year
            }
            out_function_data.append(temp)
        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get admission data by department and year
    def get_admission_data_by_dept(self, department=None, year=None):
        if department is None:
            sql_command = "SELECT school_id, school_name, channel_id, channel_name, branch_id, branch_name from admission_studied NATURAL JOIN admission_from NATURAL JOIN school NATURAL JOIN admission_channel NATURAL JOIN admission_in_branch NATURAL JOIN branch"
        elif year is None:
            sql_command = "SELECT school_id, school_name, channel_id, channel_name, branch_id, branch_name  from admission_studied NATURAL JOIN admission_from NATURAL JOIN school NATURAL JOIN admission_channel NATURAL JOIN admission_in_branch NATURAL JOIN admission NATURAL JOIN has_branch NATURAL JOIN department NATURAL JOIN branch WHERE dept_id like '%s'" % (
                department)
        else:
            sql_command = "SELECT school_id, school_name, channel_id, channel_name, branch_id, branch_name  from admission_studied NATURAL JOIN admission_from NATURAL JOIN school NATURAL JOIN admission_channel NATURAL JOIN admission_in_branch NATURAL JOIN admission NATURAL JOIN has_branch NATURAL JOIN department NATURAL JOIN branch WHERE admission_year = %d and dept_id like '%s'" % (
                year, department)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            temp = {
                'school_id': data[0],
                'school_name': data[1],
                'channel_id': data[2],
                'channel_name': data[3],
                'branch_id': data[4],
                'branch_name': data[5]
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get student status list data
    def get_status_list(self):
        sql_command = "SELECT * FROM student_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            temp = {
                'status_id': data[0],
                'status_title': data[1]
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get working status list data
    def get_working_status_list(self):
        sql_command = "SELECT * FROM work_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            temp = {
                'status_id': data[0],
                'status_title': data[1]
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

        # get working school list data

    def get_working_school_list(self):
        sql_command = "SELECT * FROM school"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            temp = {
                'school_id': data[0],
                'school_title': data[1]
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get apprentice status list data
    def get_apprentice_status_list(self):
        sql_command = "SELECT * FROM apprentice_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            temp = {
                'status_id': data[0],
                'status_title': data[1]
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get apprentice status list data
    def get_activity_list(self):
        sql_command = "SELECT activity_id,activity_name,activity_type_id,activity_year,activity_budget FROM activity"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            temp = {
                'activity_id': data[0],
                'activity_name': data[1],
                'activity_type_id': data[2],
                'activity_year': data[3],
                'activity_budget': data[4],
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # TODO() alumni
    # delete alumni
    def delete_alumni_by_year(self, year: int):
        # search student ID from graduated year
        year = int(year)
        sql_command = "select alumni_id from alumni where graduated_year = %d" % year
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        data = execute['value']
        data = list(data)

        student_id_list = []
        for student_id in data:
            student_id_list.append(student_id[0])

        try:
            self.__execute_delete_multiple("alumni_graduated", "alumni_id", student_id_list)
            self.__execute_delete_multiple("working", "alumni_id", student_id_list)
            self.__execute_delete_multiple("alumni", "alumni_id", student_id_list)
        except pymysql as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(response=True, message="Delete alumni data sucessful.", value="Delete alumni data sucessful.")
