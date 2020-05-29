import pymysql
import json
from datetime import datetime

# import constant
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

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # class helping tool function # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1DH. change epoch time to string format 2020-01-01
    def __change_epoch_to_string(self, time):
        convert = datetime.fromtimestamp(int(time)).strftime("%Y-%m-%d")
        return str(convert)

    # 2DH. change list to insert format (no date column)
    def __change_to_list_no_time(self, load):
        output_list = []
        for data in load:
            temp = list(data.values())
            # TODO() if some insert error please determine the line under this comment
            # temp = list(map(str, temp))
            output_list.append(tuple(temp))
        return output_list

    # 3DH. change list to insert format (with date column)
    def __change_to_list_with_time_columns(self, load, time_cols_index):
        output_list = []
        for data in load:
            temp = list(data.values())
            # convert epoch time to string
            if isinstance(time_cols_index, list):
                for i in time_cols_index:
                    temp[i] = self.__change_epoch_to_string(temp[i])
            else:
                temp[time_cols_index] = self.__change_epoch_to_string(temp[time_cols_index])
            temp = list(map(str, temp))
            output_list.append(tuple(temp))
        return output_list

    # 4DH. query data from database
    def __execute_query(self, sql_command):
        try:
            self.__cursor.execute(sql_command)
            result = self.__cursor.fetchall()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", result)

    # 5DH. insert data into database (one value)
    def __insert_into(self, table, attribute, value):
        sql_command = "INSERT INTO {} ({}) VALUES ({})".format(table,
                                                               ','.join(attribute),
                                                               ','.join('%s' for _ in attribute))
        try:
            self.__cursor.execute(sql_command, value)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Insert data success.")

    # 6DH. insert data into database (multiple value) from dataframe convert to json by index
    def __insert_multiple_from_dataframe_into(self, table, attribute, value, has_time=False, time_attr_indicator=None):
        sql_command = "INSERT INTO {} ({}) VALUES ({})".format(table,
                                                               ','.join(attribute),
                                                               ','.join('%s' for _ in attribute))
        if has_time:
            insert_data = self.__change_to_list_with_time_columns(value, time_attr_indicator)
        else:
            insert_data = self.__change_to_list_no_time(value)

        self.__cursor.executemany(sql_command, insert_data)

    # 7DH. insert data into database (multiple value)
    def __insert_multiple_into(self, table, attribute, value):
        sql_command = "INSERT INTO {} ({}) VALUES ({})".format(table,
                                                               ','.join(attribute),
                                                               ','.join('%s' for _ in attribute))
        self.__cursor.executemany(sql_command, value)

    # 8DH. delete data from database (one value)
    def __execute_delete_data(self, table, attribute, value):
        sql_command = "DELETE FROM {} WHERE {} LIKE '{}'".format(table, attribute, value)
        self.__cursor.execute(sql_command)

    # 9DH. delete data from database (multiple data)
    def __execute_delete_multiple_data(self, table, attribute, value):
        sql_command = "DELETE FROM {} WHERE {} LIKE {}".format(table, attribute, '%s')
        self.__cursor.executemany(sql_command, value)

    # 10DH. custom sql command with database connection commit (one execute)
    def __execute_custom_command(self, sql_command):
        try:
            self.__cursor.execute(sql_command)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 11DH. custom sql command with database connection commit (many execute)
    def __execute_many_custom_command(self, sql_command):
        try:
            self.__cursor.executemany(sql_command)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 12DH. create out function data (list type)
    def __create_out_function_data(self, data, object_indicator_list, data_indicator_list):
        out_data = []
        for item in data:
            obj = dict(zip(object_indicator_list, list(item[x] for x in data_indicator_list)))
            out_data.append(obj)
        return out_data

    # 13DH. update data in database (multiple  value)
    def __update_multiple(self, table, attribute, value, condition_attribute):
        sql_command = "UPDATE {} SET {} = {} WHERE {} = {}".format(table,
                                                                   attribute,
                                                                   '%s',
                                                                   condition_attribute,
                                                                   '%s')
        self.__cursor.executemany(sql_command, value)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # CLASS METHOD  # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # # ACTIVITY # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1AC. get all publicize activity (not ActivityActiveRecruitment activity)
    def get_activity_publicize(self, year=None):
        if year is not None and year != "null":
            current = int(year)
            previous = current - 1
            sql_command = "SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project NATURAL JOIN activity_no_ar " \
                          "WHERE project_type = 0 AND year BETWEEN %d AND %d" % (int(previous), int(year))
        else:
            sql_command = "SELECT activity_id, year, activity_budget from activity NATURAL JOIN activity_project NATURAL JOIN activity_no_ar " \
                          "WHERE project_type = 0"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['activity_id', 'activity_year',
                                                             'activity_budget'],
                                                            [0, 1, 2])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 2AC. get all active recruitment activity
    def get_activity_ar(self, year: int = None):
        if year is not None and year != "null":
            sql_command = "SELECT activity_id, school_name, branch_name, gpax, year, project_id " \
                          "FROM activity_ar NATURAL JOIN activity NATURAL JOIN activity_project " \
                          "WHERE year = {}".format(int(year))
        else:
            sql_command = "SELECT activity_id, school_name, branch_name, gpax, year, project_id " \
                          "FROM activity_ar NATURAL JOIN activity NATURAL JOIN activity_project"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['activity_id', 'school_name', 'branch_name', 'gpax',
                                                             'activity_year', 'project_id'],
                                                            [0, 1, 2, 3, 4, 5])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 3AC. get project list
    def get_project_list(self, project_type: int = None):
        if project_type is None or project_type == 'null':
            sql_command = "SELECT project_id, project_name,project_type FROM activity_project"
        else:
            sql_command = "SELECT project_id, project_name,project_type FROM activity_project " \
                          "WHERE project_type = {}".format(int(project_type))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['project_id', 'project_name', 'project_type'],
                                                   [0, 1, 2])

        return inner_res_helper.make_inner_response(True, "Success", out_data)

    # 4AC. get activity list
    def get_activity_list(self, education_year: int = None):
        if education_year is None or education_year == 'null':
            sql_command = "SELECT activity_id, activity_name, type_name, year, activity_budget, project_type " \
                          "FROM activity NATURAL JOIN activity_project NATURAL JOIN activity_type"
        else:
            sql_command = "SELECT activity_id, activity_name, type_name, year, activity_budget, project_type " \
                          "FROM activity NATURAL JOIN activity_project NATURAL JOIN activity_type " \
                          "WHERE year = {}".format(int(education_year))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['activity_id', 'activity_name', 'project_type_name',
                                                    'education_year', 'activity_budget', 'project_type'],
                                                   [0, 1, 2, 3, 4, 5])

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # 5AC. get project type
    def get_project_type(self):
        sql_command = "SELECT project_type, type_name FROM activity_type"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['project_type', 'type_name'],
                                                   [0, 1])

        return inner_res_helper.make_inner_response(True, "Query success", out_data)

    # 6AC. create project
    def create_project(self, data):
        insert = self.__insert_into(table="activity_project",
                                    attribute=['project_id', 'project_type', 'project_name'],
                                    value=data)
        return insert

    # 7AC. create activity
    def create_activity(self, data):
        insert = self.__insert_into(table="activity",
                                    attribute=['activity_id', 'project_id', 'activity_name', 'activity_budget', 'year'],
                                    value=data)
        return insert

    # 8AC. insert activity participant data
    def insert_activity_participant(self, participant_data, project_type: int):
        participant_table = participant_data['participant_data']
        participant_table = json.loads(participant_table)
        participant_table = list(participant_table.values())

        project_type = int(project_type)

        try:
            if project_type == 0:
                self.__insert_multiple_from_dataframe_into(table='activity_no_ar',
                                                           attribute=['activity_id', 'firstname', 'lastname',
                                                                      'school_name'],
                                                           value=participant_table)
            elif project_type == 1:
                self.__insert_multiple_from_dataframe_into(table='activity_ar',
                                                           attribute=['activity_id', 'firstname', 'lastname',
                                                                      'school_name', 'branch_name', 'gpax'],
                                                           value=participant_table)
            else:
                return inner_res_helper.make_inner_response(False, "Error",
                                                            "Can not insert data for this project type.")

            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 9AC. delete activity by activity id
    def delete_activity(self, act_id: str = None):
        try:
            self.__execute_delete_data(table='activity_no_ar', attribute='activity_id', value=act_id)
            self.__execute_delete_data(table="activity_ar", attribute="activity_id", value=act_id)
            self.__execute_delete_data(table="activity", attribute="activity_id", value=act_id)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Delete data success.")

    # 10AC. get year list of activity
    def get_year_list_of_activity(self):
        sql_command = "SELECT year FROM activity GROUP BY year"

        execute = self.__execute_query(sql_command)
        out_data = list()
        for year in execute['value']:
            out_data.append(year[0])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # ADMISSION # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1AD. insert admission data
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
            self.__insert_multiple_from_dataframe_into(table="admission",
                                                       attribute=['application_no', 'firstname', 'lastname',
                                                                  'gender', 'decision', 'admission_year',
                                                                  'upload_date'],
                                                       value=admission_table, has_time=True,
                                                       time_attr_indicator=6)
            self.__insert_multiple_from_dataframe_into(table="admission_in_branch",
                                                       attribute=['application_no', 'branch_id'],
                                                       value=admission_branch)
            self.__insert_multiple_from_dataframe_into(table="admission_from",
                                                       attribute=['application_no', 'channel_id'],
                                                       value=admission_from)
            self.__insert_multiple_from_dataframe_into(table="admission_studied",
                                                       attribute=['application_no', 'gpax', 'school_id'],
                                                       value=admission_studied)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 2AD. get all admission data
    def get_all_admission(self, year: int = None):
        if year is None or year == 'null':
            sql_command = "SELECT channel_id, channel_name, admission_year, branch_id, school_id, status_id, gpa_record.gpa, dept_id " \
                          "school_id, status_id, gpa_record.gpa, dept_id FROM (admission NATURAL JOIN admission_from NATURAL JOIN  " \
                          "admission_in_branch NATURAL JOIN admission_channel NATURAL JOIN admission_studied NATURAL JOIN entrance NATURAL JOIN " \
                          "has_branch) LEFT JOIN (student NATURAL JOIN has_status NATURAL JOIN gpa_record) ON student.student_id LIKE " \
                          "entrance.student_id WHERE  AND gpa_record.semester = 1"
        else:
            sql_command = "SELECT channel_id, channel_name, admission_year, branch_id, school_id, status_id, gpa_record.gpa, dept_id " \
                          "school_id, status_id, gpa_record.gpa, dept_id FROM (admission NATURAL JOIN admission_from NATURAL JOIN  " \
                          "admission_in_branch NATURAL JOIN admission_channel NATURAL JOIN admission_studied NATURAL JOIN entrance NATURAL JOIN " \
                          "has_branch) LEFT JOIN (student NATURAL JOIN has_status NATURAL JOIN gpa_record) ON student.student_id LIKE " \
                          "entrance.student_id WHERE admission_year BETWEEN {} AND {} AND gpa_record.semester = 1 AND gpa_record.education_year = {}".format(int(year) - 1, int(year),int(year))

        print(sql_command)
        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute
        out_data = self.__create_out_function_data(execute['value'],
                                                   ['channel_id', 'admission_year', 'branch_id', 'school_id',
                                                    'status_id', 'current_gpax', 'channel_name', 'dept_id'],
                                                   [0, 2, 3, 4, 5, 6, 1, 7])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 3AD. get all admission channel
    def get_admission_channel(self):
        sql_command = "SELECT channel_id, channel_name, round_id, round_name FROM admission_channel NATURAL JOIN has_round NATURAL JOIN admission_round"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['channel_id', 'channel_name', 'round_id', 'round_name'],
                                                   [0, 1, 2, 3])

        return inner_res_helper.make_inner_response(True, "Query Successful", out_data)

    # 4AD. get year list of admission
    def get_admission_year_list(self):
        sql_command = "SELECT admission_year FROM admission GROUP BY admission_year"

        execute = self.__execute_query(sql_command)
        out_data = list()
        for year in execute['value']:
            out_data.append(year[0])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 5AD. get admission list
    def get_admission_list(self):
        sql_command = "SELECT DISTINCT admission_year, round_name, channel_name, round_id, channel_id " \
                      "FROM admission NATURAL JOIN admission_from NATURAL JOIN admission_channel " \
                      "NATURAL JOIN has_round NATURAL JOIN admission_round"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['admission_year', 'round_name', 'channel_name', 'round_id',
                                                    'channel_id'],
                                                   [0, 1, 2, 3, 4])

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # 6AD. delete admission data
    def delete_admission_data(self, data=None):
        get_application_no_command = "SELECT application_no FROM admission NATURAL JOIN admission_from " \
                                     "NATURAL JOIN admission_channel NATURAL JOIN has_round " \
                                     "NATURAL JOIN admission_round WHERE admission_year = {} " \
                                     "AND round_id = {} AND channel_id = {}" \
            .format(data['year'], data['round_id'], data['channel_id'])
        execute = self.__execute_query(get_application_no_command)

        if not execute['response']:
            return execute

        data = execute['value']
        data = list(data)

        student_id_list = []
        for student_id in data:
            student_id_list.append(student_id[0])

        try:
            self.__execute_delete_multiple_data(table="admission_studied", attribute="application_no",
                                                value=student_id_list)
            self.__execute_delete_multiple_data(table="admission_in_branch", attribute="application_no",
                                                value=student_id_list)
            self.__execute_delete_multiple_data(table="admission_from", attribute="application_no",
                                                value=student_id_list)
            self.__execute_delete_multiple_data(table="admission", attribute="application_no",
                                                value=student_id_list)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Delete data success.")

    # 7AD. all admission data for admin
    def get_all_admission_admin(self, year: int = None):
        if year is None or year == 'null':
            sql_command = "SELECT channel_id, channel_name, admission_year, branch_id, school_id,dept_id " \
                          "FROM (admission NATURAL JOIN admission_from NATURAL JOIN admission_in_branch NATURAL JOIN admission_channel " \
                          "NATURAL JOIN admission_studied) NATURAL JOIN has_branch "
        else:
            sql_command = "SELECT channel_id, channel_name, admission_year, branch_id, school_id,dept_id " \
                          "FROM (admission NATURAL JOIN admission_from NATURAL JOIN admission_in_branch NATURAL JOIN admission_channel " \
                          "NATURAL JOIN admission_studied) NATURAL JOIN has_branch " \
                          "WHERE admission_year BETWEEN {} and {}".format(int(year) - 1, int(year))
        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['channel_id', 'admission_year', 'branch_id', 'school_id',
                                                    'channel_name', 'dept_id'],
                                                   [0, 2, 3, 4, 1, 5])
        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 8AD. list admission round 
    def get_list_round_admission_admin(self):
        sql_command = "SELECT round_id,round_name FROM `admission_round`"

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['round_id', 'round_name'],
                                                   [0, 1])
        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # ALUMNI # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1AL. get all alumni data
    def get_all_alumni(self, graduated_year: int = None):
        if graduated_year is None or graduated_year == 'null':
            sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, " \
                          "status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name FROM alumni " \
                          "NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch " \
                          "NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice " \
                          "NATURAL JOIN apprentice_status NATURAL JOIN department"
        else:
            sql_command = "SELECT alumni_id as student_id, branch_id, branch_name, gpax, graduated_year, status_id, " \
                          "status_title, salary, apprentice_id, apprentice_title, dept_id, dept_name " \
                          "FROM alumni NATURAL JOIN alumni_graduated NATURAL JOIN has_branch NATURAL JOIN branch " \
                          "NATURAL JOIN working NATURAL JOIN work_status NATURAL JOIN apprentice " \
                          "NATURAL JOIN apprentice_status NATURAL JOIN department " \
                          "WHERE graduated_year = {}".format(int(graduated_year))

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['student_id', 'branch_id', 'branch_name', 'dept_id', 'dept_name',
                                                    'graduated_gpax', 'congrat_year', 'work_id', 'work_status',
                                                    'salary', 'apprentice_id', 'apprentice_title'],
                                                   [0, 1, 2, 10, 11, 3, 4, 5, 6, 7, 8, 9])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 2AL. delete alumni by year
    def delete_alumni_by_year(self, year: int):
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
            self.__execute_delete_multiple_data(table="alumni_graduated", attribute="alumni_id",
                                                value=student_id_list)
            self.__execute_delete_multiple_data(table="working", attribute="alumni_id",
                                                value=student_id_list)
            self.__execute_delete_multiple_data(table="apprentice", attribute="alumni_id",
                                                value=student_id_list)
            self.__execute_delete_multiple_data(table="alumni", attribute="alumni_id",
                                                value=student_id_list)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Delete data success.")

    # 3AL. get working status list
    def get_working_status_list(self):
        sql_command = "SELECT * FROM work_status"
        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['status_id', 'status_title'],
                                                   [0, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_data)

    # 4AL. get apperentice status list
    def get_apprentice_status_list(self):
        sql_command = "SELECT * FROM apprentice_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['status_id', 'status_title'],
                                                            [0, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 5AL. insert alumni data to database
    def insert_alumni_data(self, data):
        # prepare receive data
        alumni_table = data['alumni']
        alumni_table = json.loads(alumni_table)
        alumni_table = list(alumni_table.values())
        alumni_graduated = data['alumni_graduated']
        alumni_graduated = json.loads(alumni_graduated)
        alumni_graduated = list(alumni_graduated.values())
        alumni_working = data['working_table']
        alumni_working = json.loads(alumni_working)
        alumni_working = list(alumni_working.values())
        alumni_apprentice = data['apprentice_table']
        alumni_apprentice = json.loads(alumni_apprentice)
        alumni_apprentice = list(alumni_apprentice.values())

        try:
            self.__insert_multiple_from_dataframe_into(table="alumni",
                                                       attribute=['alumni_id', 'gpax', 'graduated_year'],
                                                       value=alumni_table)
            self.__insert_multiple_from_dataframe_into(table="alumni_graduated",
                                                       attribute=['alumni_id', 'branch_id'],
                                                       value=alumni_graduated)
            self.__insert_multiple_from_dataframe_into(table="working",
                                                       attribute=['alumni_id', 'status_id', 'company', 'institution',
                                                                  'job_description', 'faculty', 'branch', 'salary'],
                                                       value=alumni_working)
            self.__insert_multiple_from_dataframe_into(table="apprentice",
                                                       attribute=['alumni_id', 'apprentice_id'],
                                                       value=alumni_apprentice)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # INFORMATION # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1IF. get department with number of student
    def get_department(self, dept_id: str = None):
        if dept_id is None or dept_id == 'null':
            sql_command = "SELECT count(branch_id) as student_amount, branch_id, branch_name, dept_id, dept_name " \
                          "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN department " \
                          "NATURAL JOIN branch GROUP BY branch_id ORDER BY dept_id ASC"
        else:
            sql_command = "SELECT count(branch_id) as student_amount, branch_id, branch_name, dept_id, dept_name " \
                          "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN department " \
                          "NATURAL JOIN branch WHERE dept_id like '{}' GROUP BY branch_id " \
                          "ORDER BY dept_id ASC".format(dept_id)

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        if len(execute['value']) < 1:
            return inner_res_helper.make_inner_response(False, "Doesn't have value", None)

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

    # 2IF. get department with course detail
    def get_department_detail(self, dept_id: str = None):
        if dept_id is None or dept_id == "null":
            sql_command = "SELECT dept_id, branch_id, course_id, dept_name, branch_name, course_name, course_year " \
                          "FROM department NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN has_course " \
                          "NATURAL JOIN course"
        else:
            sql_command = "SELECT dept_id, branch_id, course_id, dept_name, branch_name, course_name, course_year " \
                          "FROM department NATURAL JOIN has_branch NATURAL JOIN branch NATURAL JOIN has_course " \
                          "NATURAL JOIN course WHERE dept_id like '{}'".format(dept_id)

        execute = self.__execute_query(sql_command)

        data = execute['value']
        out_data = []
        cur_dept = None
        past_dept = []
        for dept in data:
            if cur_dept != dept[0] and not dept[0] in past_dept:
                cur_dept = dept[0]
                detail = {'dept_id': dept[0], 'dept_name': dept[3], 'branch': list(), 'course': list()}
                cur_branch = None
                for dept2 in data:
                    if cur_branch != dept2[1] and dept[0] == dept2[0]:
                        cur_branch = dept2[1]
                        branch = {
                            'branch_id': dept2[1],
                            'branch_name': dept2[4]
                        }
                        detail['branch'].append(branch)
                cur_course = None
                for dept3 in data:
                    if cur_course != dept3[2] and dept[0] == dept3[0]:
                        cur_course = dept3[2]
                        course = {
                            'course_id': dept3[2],
                            'course_name': dept3[5],
                            'course_year': dept3[6]
                        }
                        detail['course'].append(course)
                past_dept.append(dept[0])
                out_data.append(detail)

        return inner_res_helper.make_inner_response(True, "Query success", out_data)

    # 3IF. get branch data
    def get_branch(self, branch_id=None):
        if branch_id is None or branch_id == "null":
            sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, " \
                          "has_branch_id from branch natural join has_branch natural join department as dept"
        else:
            sql_command = "select branch.branch_id as id, branch.branch_name as name, dept.dept_id, dept.dept_name, " \
                          "has_branch_id from branch natural join has_branch natural join department as dept " \
                          "where branch_id like '{}'".format(branch_id)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['branch_id', 'branch_name', 'dept_id', 'dept_name',
                                                             'has_branch_id'],
                                                            [0, 1, 2, 3, 4])

        return inner_res_helper.make_inner_response(True, "Query Successful", out_function_data)

    # 4IF. get course data with subject detail
    def get_course(self, course_id: str = None):
        if course_id is None or course_id == "null":
            sql_command = "SELECT course_id, course_name, course_year, subject_code, subject_name_th, subject_name_en, " \
                          "subject_weigth FROM course NATURAL JOIN has_subject NATURAL JOIN subject"
        else:
            sql_command = "SELECT course_id, course_name, course_year, subject_code, subject_name_th, subject_name_en, " \
                          "subject_weigth FROM course NATURAL JOIN has_subject NATURAL JOIN subject" \
                          " WHERE course_id like '{}'".format(course_id)

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        data = execute['value']
        out_data = list()
        cur_course = None

        for data_row in data:
            if cur_course != data_row[0]:
                cur_course = data_row[0]
                detail = {
                    'course_id': data_row[0], 'course_name': data_row[1], 'course_year': data_row[2], 'subject': list()
                }
                cur_subject = None
                for subject in data:
                    if cur_subject != subject[3] and cur_course == subject[0]:
                        cur_subject = subject[3]
                        subject_data = {
                            'subject_code': subject[3],
                            'subject_name_th': subject[4],
                            'subject_name_en': subject[5],
                            'subject_weight': subject[6]
                        }
                        detail['subject'].append(subject_data)
                out_data.append(detail)

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # 5IF. get course list
    def get_course_list(self):
        sql_command = "SELECT course_id, course_name, course_year FROM course"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['course_id', 'course_name', 'course_year'],
                                                   [0, 1, 2])

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # 6IF. get school list
    def get_school_lis(self):
        sql_command = "SELECT * FROM school"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['school_id', 'school_title'],
                                                            [0, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 7IF. get department from ds
    def get_department_ds(self):
        sql_command = "SELECT  branch_id, branch_name, dept_id, dept_name " \
                      "FROM department NATURAL JOIN has_branch NATURAL JOIN branch "
                     
        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_data = self.__create_out_function_data(execute['value'],
                                                   ['dept_id', 'dept_name', 'branch_id', 'branch_name'],
                                                   [2, 3, 0, 1])

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # STUDENT # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1ST. insert student academic record
    def insert_academic_record(self, academic_data, gpa_data, gpax_data, status_data):
        # academic_data = json.loads(academic_data)
        # academic_data = list(academic_data.values())
        try:
            self.__insert_multiple_into(table="academic_record",
                                        attribute=['student_id', 'subject_code', 'grade', 'semester',
                                                   'education_year'],
                                        value=academic_data)

            self.__insert_multiple_into(table="gpa_record",
                                        attribute=['student_id', 'gpa', 'semester', 'education_year'],
                                        value=gpa_data)

            self.__update_multiple(table="student",
                                   attribute="current_gpax",
                                   value=gpax_data,
                                   condition_attribute="student_id")

            self.__update_multiple(table="has_status",
                                   attribute="status_id",
                                   value=status_data,
                                   condition_attribute="student_id")

            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Insert data success.")

    # 2ST. insert student gpa record
    # def insert_gpa_record(self, gpa_data):
    #     return self.__insert_multiple_into(table="gpa_record",
    #                                        attribute=['student_id', 'gpa', 'semester', 'year'],
    #                                        value=gpa_data)

    # 2ST. insert new student data
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
            self.__insert_multiple_from_dataframe_into(table="student",
                                                       attribute=['student_id', 'firstname', 'lastname', 'gender'],
                                                       value=student_table)
            self.__insert_multiple_from_dataframe_into(table="entrance",
                                                       attribute=['student_id', 'application_no'],
                                                       value=entrance_table)
            self.__insert_multiple_from_dataframe_into(table="graduated",
                                                       attribute=['student_id', 'school_id', 'gpax'],
                                                       value=graduated_table)
            self.__insert_multiple_from_dataframe_into(table="has_status",
                                                       attribute=['student_id', 'status_id'],
                                                       value=has_status_table)
            self.__insert_multiple_from_dataframe_into(table="study_in",
                                                       attribute=['student_id', 'branch_id'],
                                                       value=study_in_table)
            self.__db_connection.commit()
        except pymysql.Error as e:
            print("Error %d: %s" % (e.args[0], e.args[1]))
            self.__db_connection.rollback()
            return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))
        return inner_res_helper.make_inner_response(True, "Success", "Execute success.")

    # 3ST. delete student TODO waiting for decision about this function
    def delete_student_by_year(self, year: str):
        year = str(year)

        if year is None or year == "null":
            return inner_res_helper.make_inner_response(response=False,
                                                        message="No delete year input.",
                                                        value="No delete year input")

        year = year[2:]
        year = "{}%".format(year)

        # print("DELETE HELLO {}".format(year))

        # try:
        #     self.__execute_delete_data(table="study_in", column="student_id", value=year)
        #     self.__execute_delete_data(table="entrance", column="student_id", value=year)
        #     self.__execute_delete_data(table="graduated", column="student_id", value=year)
        #     self.__execute_delete_data(table="gpa_record", column="student_id", value=year)
        #     self.__execute_delete_data(table="academic_record", column="student_id", value=year)
        #     self.__execute_delete_data(table="student", column="student_id", value=year)
        # except pymysql.Error as e:
        #     print("Error %d: %s" % (e.args[0], e.args[1]))
        #     return inner_res_helper.make_inner_response(False, str(e.args[0]), str(e.args[1]))

        return inner_res_helper.make_inner_response(True, "Query Successful", "Success")

    # 4ST. get all student data
    def get_all_student(self, dept_id: str = None):
        if dept_id is not None and dept_id != 'null':
            sql_command = "select student_id, dept_name, branch_name, current_gpax, status_id, dept_id, branch_id " \
                          "from student natural join study_in natural join has_branch natural join branch " \
                          "natural join department NATURAL JOIN has_status where dept_id like '{}'".format(dept_id)
        else:
            sql_command = "select student_id, dept_name, branch_name, current_gpax, status_id, dept_id, branch_id " \
                          "from student natural join study_in natural join has_branch natural join branch " \
                          "natural join department NATURAL JOIN has_status"

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

    # 5ST. Student tracking
    def get_student_tracking(self, id_student):
        sql_command = "SELECT gpa, semester, current_gpax, education_year,firstname,lastname " \
                      "FROM `gpa_record` NATURAL JOIN student where student_id='{}'".format(id_student)
        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['gpa', 'semester', 'current_gpax', 'education_year',
                                                             'firstname', 'lastname'],
                                                            [0, 1, 2, 3, 4, 5])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 6ST. get all student academic record
    def get_all_academic_record(self, dept_id=None, year=None):
        if dept_id is None and year is None or dept_id == "null" or year == "null":
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
                          "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in NATURAL JOIN has_branch"
        elif dept_id is not None and year is None or year == "null":
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
                          "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in " \
                          "NATURAL JOIN has_branch WHERE dept_id like '{}'".format(dept_id)
        elif year is not None and dept_id is None or dept_id == "null":
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
                          "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in " \
                          "NATURAL JOIN has_branch WHERE education_year = {}".format(int(year))
        else:
            sql_command = "select student_id, subject_code, semester, education_year, grade, status_id, branch_id " \
                          "from academic_record NATURAL JOIN has_status NATURAL JOIN study_in " \
                          "NATURAL JOIN has_branch WHERE education_year = {} " \
                          "AND dept_id LIKE '{}'".format(int(year), dept_id)
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['student_id', 'subject_code', 'semester', 'education_year',
                                                             'grade', 'education_status', 'branch_id'],
                                                            [0, 1, 2, 3, 4, 5, 6])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 7ST. get academic result by branch
    def subject_by_branch(self, branch_id, semester, education_year):
        sql_command = "SELECT subject.subject_code, subject.subject_name_en, subject.subject_weigth, " \
                      "academic_record.grade FROM (study_in NATURAL JOIN academic_record) " \
                      "LEFT JOIN subject ON academic_record.subject_code = subject.subject_code " \
                      "WHERE branch_id LIKE '{}' AND academic_record.semester = {} " \
                      "AND academic_record.education_year = {}".format(branch_id, semester, education_year)

        execute = self.__execute_query(sql_command)
        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['subject_code', 'subject_name_en', 'subject_weigth',
                                                             'grade'],
                                                            [0, 1, 2, 3])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 8ST. get student with education status by department
    def get_student_status(self, dept_id, status_id):
        sql_command = "SELECT student_id, firstname, lastname, current_gpax, branch_name, branch_id " \
                      "FROM student NATURAL JOIN study_in NATURAL JOIN has_branch NATURAL JOIN branch " \
                      "NATURAL JOIN department NATURAL JOIN has_status WHERE dept_id LIKE '{}' " \
                      "AND status_id LIKE '{}'".format(str(dept_id), str(status_id))
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

    # 9ST. get education status list
    def get_status_list(self):
        sql_command = "SELECT * FROM student_status"
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        out_function_data = self.__create_out_function_data(execute['value'],
                                                            ['status_id', 'status_title'],
                                                            [0, 1])

        return inner_res_helper.make_inner_response(response=True, message="Success", value=out_function_data)

    # 10ST. get student list group by department
    def get_student_by_year(self, year: str = None):
        sql_command = "SELECT student_id, firstname, lastname, branch_name, current_gpax, dept_id, dept_name, branch_id " \
                      "FROM student NATURAL JOIN study_in NATURAL JOIN branch NATURAL JOIN " \
                      "has_branch NATURAL JOIN department"

        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return execute

        data = execute['value']
        out_data = []
        cur_dept = None
        past_dept = []
        for student in data:
            if cur_dept != student[5] and not student[5] in past_dept:
                cur_dept = student[5]
                detail = {'dept_id': student[5], 'dept_name': student[5]}
                std_list = []
                for s_detail in data:
                    if cur_dept == s_detail[5]:
                        std_detail = {
                            'student_id': s_detail[0],
                            'firstname': s_detail[1],
                            'lastname': s_detail[2],
                            'current_gpax': s_detail[4],
                            'branch_name': s_detail[3]
                        }
                        std_list.append(std_detail)
                detail['student'] = std_list
                past_dept.append(student[5])
                out_data.append(detail)

        return inner_res_helper.make_inner_response(True, "Query success", out_data)

    # 11ST. get education year as list
    def get_education_year_list(self):
        sql_commad = "SELECT student_id, dept_name, branch_name, dept_id, branch_id " \
                     "FROM student NATURAL JOIN study_in NATURAL JOIN branch " \
                     "NATURAL JOIN has_branch NATURAL JOIN department " \
                     "GROUP BY LEFT(student_id,2), dept_id, branch_id"

        execute = self.__execute_query(sql_commad)

        if not execute['response']:
            return execute

        out_data = []
        for data in execute['value']:
            year = {
                'education_year': data[0][:2],
                'dept_name': data[1],
                'branch_name': data[2],
                'dept_id': data[3],
                'branch_id': data[4]
            }
            out_data.append(year)

        return inner_res_helper.make_inner_response(True, "Query success.", out_data)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # # # # # # # # # # # # # # # # # # # # # # # # USER # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # 1US. get user
    def get_user(self, username: str = None):
        if username is None or username == "null":
            return inner_res_helper.make_inner_response(response=False, message="No username input.",
                                                        value="No username input")

        sql_command = "select staff_id, level_id, firstname, lastname from staff where staff_id like '%s'" % username
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return inner_res_helper.make_inner_response(response=False, message="User not found",
                                                        value="User not found")

        return execute

    # 2US. get user for auth (have password)
    def get_user_for_auth(self, username: str = None):
        if username is None or username == "null":
            return inner_res_helper.make_inner_response(response=False, message="No username input.",
                                                        value="No username input")

        sql_command = "select staff_id, level_id, firstname, lastname, password " \
                      "from staff where staff_id like '%s'" % username
        execute = self.__execute_query(sql_command)

        if not execute['response']:
            return inner_res_helper.make_inner_response(response=False, message="User not found",
                                                        value="User not found")

        return execute

    # 3US. create user
    def create_user(self, staff_id: str = None, first_name: str = None, last_name: str = None,
                    hashed_pass: str = None,
                    staff_level: int = -1, ):
        if staff_id is None or first_name is None or last_name is None or hashed_pass is None or staff_id == "null" \
                or first_name == "null" or last_name == "null" or hashed_pass == "null":
            return inner_res_helper.make_inner_response(response=False, message="Some argument is None",
                                                        value="Some argument is None")

        try:
            self.__insert_into(table="staff",
                               attribute=["staff_id", "level_id", "firstname", "lastname", "password"],
                               value=[staff_id, staff_level, first_name, last_name, hashed_pass])
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(False, "Error", "Can not create user.")

        return inner_res_helper.make_inner_response(True, "Success", "User was created")
