from flask import Blueprint, jsonify, request, make_response, current_app as app

# import api helper
import backend.helpers.api_response_helper as api_helper
from backend.helpers.database_helper import DatabaseHelper
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


# # # # # get department student data
# show department data page (vut)
@api_bp.route('/department/student', methods=['GET'])
def get_department_student_data():
    # this api need department id
    department = request.args.get('dept_id')

    db = DatabaseHelper.get_instance()
    data = db.get_department_student_data(department)

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
