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

    # singleton check
    @staticmethod
    def get_instance():
        if DatabaseHelper.__instance is None:
            DatabaseHelper()
        return DatabaseHelper.__instance

    def __init__(self):
        if DatabaseHelper.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            if self.__db_connection is None:
                self.__db_connection = pymysql.connect(self.__host, self.__user, self.__password, self.__db)
                self.__cursor = self.__db_connection.cursor()
                DatabaseHelper.__instance = self

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

    # execute query function
    def __execute_query(self, sql_command):
        try:
            self.__cursor.execute(sql_command)
            result = self.__cursor.fetchall()
            return inner_res_helper.make_inner_response(True, "Success", result)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        # # # # # manage data for admin part # # # # #

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
        print(admission_studied)
        admission_studied = list(admission_studied.values())

        try:
            self.__multiple_insert(table="admission",
                                   column=['application_no', 'firstname', 'lastname', 'gender', 'admission_year',
                                           'decision', 'upload_date'], data=admission_table, has_time=True, time_cols=6)
            self.__multiple_insert(table="admission_in_branch", column=['application_no', 'has_branch_id'],
                                   data=admission_branch)
            self.__multiple_insert(table="admission_from", column=['application_no', 'channel_id'], data=admission_from)
            self.__multiple_insert(table="admission_studied", column=['application_no', 'gpax', 'school_id'],
                                   data=admission_studied)
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # get all student data (pueng)
    def get_all_student(self):
        sql_command = "select student_id, dept_name, branch_name, current_gpax from student natural join study_in natural join has_branch natural join branch natural join department"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            data = {'student_id': data[0], 'department': data[1], 'branch': data[2], 'current_gpax': data[3]}
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get all student academic record (pueng)
    def get_all_student_academic_record(self):
        sql_command = "select student_id, subject_code, semester, education_year, grade from academic_record"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            data = {'student_id': data[0], 'subject_code': data[1], 'semester': data[2], 'education_year': data[3],
                    'grade': data[4]}
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # get alumni data (aom request)
    # TODO() this method doesn't change the sql command waiting the data
    def get_all_alumni(self):
        sql_command = "select student_id, branch.branch_name as branch, graduated_gpax, congrat_year, work_status.status_title as work_status, company, salary from (alumni left join branch on alumni.branch_id = branch.branch_id) left join work_status on alumni.work_status = work_status.status_id"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for data in execute['value']:
            data = {'student_id': data[0], 'branch': data[1], 'graduated_gpax': data[2], 'congrat_year': data[3],
                    'work_status': data[4], 'company': data[5], 'salary': data[6]}
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

        # # # # # general path # # # # #
    def get_department(self, name):
        if name is None:
            sql_command = "SELECT dept_name, dept_id FROM department"
        else:
            sql_command = "SELECT dept_name, dept_id FROM department where dept_id = %s" %(name)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for dept in execute['value']:
            temp = {
                'dept_name': dept[0],
                'dept_id': dept[1]
            }
            out_function_data.append(temp)

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    def get_branch(self, branch_id=None):
        if branch_id is None:
            sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, has_branch_id from branch natural join has_branch natural join department as dept"
        else:
            sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, has_branch_id from branch natural join has_branch natural join department as dept where branch_id = %s" % (branch_id)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = []
        for branch in execute['value']:
            data = {'branch_id': branch[0], 'branch_name': branch[1], 'dept_id': branch[2], 'dept_name': branch[3],
                    'has_branch_id': branch[4]}
            out_function_data.append(data)

        return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)

    # get student data by department
    def get_department_student_data(self, dept_id):
        sql_command = "SELECT student_id, current_gpax, branch_name, branch_id, status_id FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN department NATURAL JOIN has_status WHERE dept_id = %s" % (
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
                'branch_name': data[2],
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
