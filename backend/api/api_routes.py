from flask import Blueprint, jsonify, request, make_response, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper

# import modules
from backend.modules.SummarizeData import SummarizeData as sum
from backend.modules.AnalyzeStudent import AnalyzeStudent

api_bp = Blueprint('api_bp', __name__, url_prefix='/api/v1')


# # # # # get general data part
# get general department data such as name , id
@api_bp.route('/department', methods=['GET'])
def get_department_data():
    dept_id = request.args.get('dept_id')

    db = DatabaseHelper.get_instance()
    data = db.get_department(dept_id)

    return api_helper.return_response(data)


# get general branch data
@api_bp.route('/branch', methods=['GET'])
def get_branch_data():
    branch_id = request.args.get('branch_id')

    db = DatabaseHelper.get_instance()
    data = db.get_branch(branch_id)

    return api_helper.return_response(data)


@api_bp.route('/admission/channel', methods=['GET'])
def get_admission_channel():

    db = DatabaseHelper.get_instance()
    data = db.get_admission_channel()

    return api_helper.return_response(data)


# # # # # get department student data
# show department data page (vut)
@api_bp.route('/department/student', methods=['GET'])
def get_department_student_data():
    # this api need department id
    department = request.args.get('dept_id')

    db = AnalyzeStudent.get_instance()
    data = db.analyze_by_dept(department)

    # summarize = sum.get_instance()
    # data = summarize.summarize_overview_dept_home(department)

    return api_helper.return_response(data)


# # # # # get admission data
# get admission data by department and year
@api_bp.route('/admission/department', defaults={'department': None, 'year': None}, methods=['GET'])
@api_bp.route('/admission/department/<department>', defaults={'year': None}, methods=['GET'])
@api_bp.route('/admission/department/<department>/<int:year>', methods=['GET'])
def get_admission_by_dept_year(department, year):
    # this api required department id and year
    db = DatabaseHelper.get_instance()
    data = db.get_admission_data_by_dept(department, year)

    return api_helper.return_response(data)
