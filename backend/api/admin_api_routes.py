from flask import Blueprint, request, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
import backend.helpers.upload_helper as upload_helper
from backend.helpers.data_helper import DataHelper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.read_google_sheet as read_sheet

# import project constant
import backend.Constant as Constant

# import modules
from backend.modules.AnalyzeStudent import AnalyzeStudent
from backend.modules.AnalyzeAlumni import  AnalyzeAlumni

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/api/v1/admin')


# upload admission data api
@admin_bp.route('/admission', methods=['POST'])
def insert_admission():
    # This api need "Year" as year , "Admission type" as admission_type
    # and "Admission channel" as channel to be a parameter

    year = request.form.get('year')
    channel = request.form.get('channel')

    if year is None or channel is None:
        value = {
            "year": year,
            "channel": channel
        }
        return api_helper.create_response(message="One of these is Null", response=False, data=[value],
                                          response_code=418)

    try:
        file = request.files['upload']
        if file and Constant.allowed_admission_file(file.filename):
            destination = upload_helper.upload_file(Constant.ADMISSION_FOLDER, file, year)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DataHelper.get_instance()
        insert_value = data_helper.read_admission(channel, year, destination['value'])
        if insert_value['response']:
            db = DatabaseHelper.get_instance()
            insert = db.insert_admission(insert_value['value'])
        else:
            return api_helper.return_response(insert_value)
    else:
        return api_helper.return_response(destination)
    return api_helper.return_response(insert)


# upload current student academic record
@admin_bp.route('/academic', methods=['POST'])
def insert_academic_record():
    # this api need education year (2561, 2562) and semester (1,2 or S)
    year = request.form.get('year')
    semester = request.form.get('semester')

    if year is None or semester is None:
        value = {
            'year': year,
            'semester': semester
        }
        return api_helper.create_response(message="One of these is Null", response=False, data=[value],
                                          response_code=418)

    try:
        file = request.files['upload']
        if file and Constant.allowed_academic_file(file.filename):
            destination = upload_helper.upload_file(store_folder=Constant.ACADEMIC_FOLDER, file=file, year=year)
        else:
            return api_helper.create_error_exception("Type of file is not match", "file not match", 418)
    except Exception as e:
        print(e)
        return api_helper.create_error_exception(str(e), "Can not find a file with " + str(e.args[0]), 400)

    if destination['response']:
        data_helper = DatabaseHelper.get_instance()
        insert_value = data_helper.read_academic_file(destination['value'], year, semester)
        if insert_value['response']:
            data = insert_value['value']
            db = DatabaseHelper.get_instance()
            academic_record = db.insert_academic_record(data['academic_record'])
            if not academic_record['response']:
                return api_helper.create_response(message=academic_record['message'], response=False, response_code=500)
            gpa_record = db.insert_gpa_record(data['gpa_record'])
            if not gpa_record['response']:
                return api_helper.create_response(message=gpa_record['message'], response=False, response_code=500)

    return api_helper.create_response(message="Developing", response=True, response_code=200, data="Developing")


@admin_bp.route('/department/analyze/student', methods=['GET'])
def get_analyze_student():
    # this api need department id
    department = request.args.get('dept_id')

    analyze = AnalyzeStudent.get_instance()
    result = analyze.analyze_by_dept(department)

    return api_helper.return_response(result)




# get student in department by status
@admin_bp.route('/department/student/status', methods=['GET'])
def get_probation_student():
    # this api need department id and status id
    department = request.args.get('dept_id')
    status = request.args.get('status_id')

    db = DatabaseHelper.get_instance()
    data = db.get_student_status(department, status)

    return api_helper.return_response(data)


# # # # # read alumni survey google sheet
@admin_bp.route('/readsheet', methods=['GET'])
def read_google_sheet():
    # this api require google sheet share url
    # header and read data is an argument for select return type
    sheet_url = request.args.get('sheet_url')
    header = request.args.get('header')
    read_data = request.args.get('read_data')

    if header:
        data = read_sheet.read_table_header(sheet_url)
        return api_helper.return_response(data)

    if read_data:
        data = read_sheet.read_sheet_data(sheet_url)
        return api_helper.return_response(data)

    value = {
        'read_data': read_data,
        'header': header
    }

    return api_helper.create_response(response_code=500, message="Read error, One of these Null", response=False, data=value)


@admin_bp.route('/alumni/analyze/survey', methods=['POST'])
def alumni_analyze_survey():
    # this api require sheet_url, columns
    receive_json = request.json
    sheet_url = receive_json['sheet_url']
    column = receive_json['column']

    analyze = AnalyzeAlumni.get_instance()
    data = analyze.analyze_survey(sheet_url, column)

    return api_helper.return_response(data)
    # return api_helper.create_response(response_code=200, message="Developing", response=True, data="Developing")