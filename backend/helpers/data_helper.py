# this file for manage data from upload file
import pandas as pd
from datetime import datetime

# import project constant
import backend.Constant

# import database connection
from backend.helpers.database_helper import DatabaseHelper

# import inner response
import backend.helpers.inner_response_helper as inner_res_helper


class DataHelper:
    # class attribute
    __instance = None

    # singleton check
    @staticmethod
    def get_instance():
        if DataHelper.__instance is None:
            DataHelper()
        return DataHelper.__instance

    def __init__(self):
        if DataHelper.__instance is not None:
            raise Exception("This class is singleton")
        else:
            DataHelper.__instance = self

    # read admission data from excel file
    def read_admission(self, channel, year, file_location):
        df = pd.read_excel(file_location, converters={'เลขที่ใบสมัคร': str, 'รหัสสถานศึกษา': str})

        try:
            df = df.loc[1:, ['เลขที่ใบสมัคร', 'คำนำหน้านาม(ไทย)', 'ชื่อ(ไทย)', 'นามสกุล(ไทย)', 'GPAX', 'รหัสสถานศึกษา',
                             'สาขาวิชาที่สมัคร', 'ได้เข้าศึกษา']]
            df.rename(columns={'เลขที่ใบสมัคร': 'application_no', 'คำนำหน้านาม(ไทย)': 'gender', 'ชื่อ(ไทย)': 'firstname',
                               'นามสกุล(ไทย)': 'lastname', 'รหัสสถานศึกษา': 'school_id', 'สาขาวิชาที่สมัคร': 'branch',
                               'ได้เข้าศึกษา': 'decision'}, inplace=True)
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(False,
                                                        "Please check your file or table head " + str(e.args[0]),
                                                        "Please check your file or table head " + str(e.args[0]))
        # admission table
        admission_table = df.loc[:, ['application_no', 'firstname', 'lastname', 'gender', 'decision']]
        admission_table['admission_year'] = year
        admission_table['upload_date'] = datetime.now().timestamp()
        admission_table.loc[admission_table['gender'] == 'นาย', ['gender']] = 'male'
        admission_table.loc[admission_table['gender'].str.contains('นาง'), ['gender']] = 'female'
        admission_table.loc[admission_table['decision'] == 'ไม่', ['decision']] = -1
        admission_table.loc[admission_table['decision'] == 'ใช่', ['decision']] = 1
        admission_table['decision'].fillna(-1, inplace=True)

        # admission in branch table
        admission_branch = df.loc[:, ['application_no', 'branch']]

        # get branch data from database
        db = DatabaseHelper.get_instance()
        branch = db.get_branch()
        branch = branch['value']

        for i in branch:
            branch_name = i['branch_name']
            if admission_branch.loc[admission_branch['branch'].str.contains(branch_name.split()[0]), ['branch']].shape[0] > 0:
                admission_branch.loc[admission_branch['branch'].str.contains(branch_name.split()[0]), ['branch']] = str(i['branch_id'])

        admission_branch.rename(columns={'branch': 'branch_id'}, inplace=True)

        # admission from table
        admission_from = df.loc[:, ['application_no']]
        admission_from['channel_id'] = channel

        # admission studied
        admission_studied = df.loc[:, ['application_no', 'GPAX', 'school_id']]
        admission_studied['school_id'] = '1010335002'

        # make json data to send to database helper class
        out_function_data = {'admission_table': admission_table.to_json(orient='index'),
                             'admission_branch': admission_branch.to_json(orient='index'),
                             'admission_from': admission_from.to_json(orient='index'),
                             'admission_studied': admission_studied.to_json(orient='index')}
        return inner_res_helper.make_inner_response(True,
                                                    "Data for insert in to database",
                                                    out_function_data)

    def read_academic_file(self, file_location, year, semester):
        df = pd.read_excel(file_location, converters={'รหัส': str}, sheet_name=None)

        if df is None:
            return inner_res_helper.make_inner_response(response=False, message="Cannot read file", value="Cannot read file")
        sheet_name = list(df.keys())

        academic_record = []
        gpa_record = []

        try:
            for sheet_number in range(len(sheet_name)):
                # get sheet from workbook
                sheet = df[sheet_name[sheet_number]]
                sheet.dropna(how='all', axis=1, inplace=True)
                # read data from sheet
                for std in range(sheet.shape[0]):
                    temp = sheet.iloc[std, :]
                    temp = temp.dropna()
                    temp = temp.reset_index()
                    subject_list = list(temp.index)
                    std_id = temp.iloc[0, 1]
                    gpa = [std_id, temp.iloc[-2, 1], semester, year]
                    gpa = list(map(str, gpa))
                    gpa_record.append(tuple(gpa))
                    # get data per student
                    for subject in range(1, len(subject_list) - 2):
                        data = [std_id]
                        code = temp.iloc[subject, 0][:6]
                        grade = temp.iloc[subject, 1]
                        data.append(code)
                        data.append(grade)
                        data.append(semester)
                        data.append(year)
                        data = list(map(str, data))
                        academic_record.append(tuple(data))
        except Exception as e:
            print(e)
            return inner_res_helper.make_inner_response(response=False, message="Error in read data", value=str(e))

        out_function_data = {
            'academic_record': academic_record,
            'gpa_record': gpa_record
        }

        return inner_res_helper.make_inner_response(True,
                                                    "Data for insert in to database",
                                                    out_function_data)
