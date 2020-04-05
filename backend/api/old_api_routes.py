from flask import Blueprint, jsonify, request, make_response, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# import database connection
from backend.modules.old_DatabaseConnection import DatabaseConnection


# import application Constant
import backend.Constant as constant

api_bp = Blueprint('api_bp', __name__, url_prefix='/api/v1')


# TODO() Don't use this file and do not delete it too.
# this api is in develop. can use this api but it might change in the future
@api_bp.route('/school', methods=['GET'])
def allSchool():
    headers = {"Content-type": "application/json"}

    connect = DatabaseConnection.getInstance()
    data = connect.get_all_school_data()
    del connect

    if data:
        return make_response(jsonify({"data": data}), 200, headers)
    else:
        return make_response(jsonify({"data": data}), 500, headers)


# this api is in develop. can use this api but it might change in the future
@api_bp.route('/staff', methods=['POST'])
def create_staff():
    if request.method == 'POST':
        headers = {"Content-type": "application/json"}
        data = request.get_json()

        staff_id = data['staff_id']
        staff_level = data['staff_level']
        fname = data['firstname']
        lname = data['lastname']
        hashed_pass = generate_password_hash(data['password'], method='sha256')

        connect = DatabaseConnection.getInstance()
        result = connect.create_staff(staff_id, staff_level, fname, lname, hashed_pass)
        del connect

        if result:
            return make_response(jsonify({"result": result}), 200, headers)
        else:
            return make_response(jsonify({"result": result}), 500, headers)


# this api is in develop. can use this api but it might change in the future
@api_bp.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Please Login'})

    connect = DatabaseConnection().getInstance()
    user = connect.get_user(auth.username)
    del connect

    if user is None:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Please Login'})

    if check_password_hash(user[4], auth.password):
        token = jwt.encode({'staff_id': user[0], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Please Login'})



@api_bp.route('/admission', defaults={'branch': None, 'year': None, 'types': None, 'channel': None}, methods=['GET'])
@api_bp.route('/admission/<int:branch>', defaults={'year': None, 'types': None, 'channel': None}, methods=['GET'])
@api_bp.route('/admission/<int:branch>/<int:year>', defaults={'types': None, 'channel': None}, methods=['GET'])
@api_bp.route('/admission/<int:branch>/<int:year>/<int:types>', defaults={'channel': None}, methods=['GET'])
@api_bp.route('/admission/<int:branch>/<int:year>/<int:types>/<int:channel>', methods=['GET'])
def get_admission(branch, year, types, channel):
    # sending branch, year, admission type and admission channel to get the data

    headers = {"Content-type": "application/json"}

    con = DatabaseConnection.getInstance()
    data = con.get_admission_data(branch, year, types, channel)
    del con

    return APIResponse.return_response(data)


@api_bp.route('/branch', methods=['GET'])
def branch():
    headers = {"Content-type": "application/json"}
    con = DatabaseConnection.getInstance()
    data = con.get_branch()

    if data['response']:
        return make_response(jsonify({"response": data['response'], "message": data['message'], "data": data['data']}),
                             200, headers)
    else:
        return make_response(jsonify({"response": data['response'], "message": data['message'], "data": data['data']}),
                             500, headers)


# upload current student academic record
# @api_bp.route('/academic', method=['POST'])
# def upload_academic():
#     # this api need update year and semester to be an input with the file.
#     headers = {"Content-type": "application/json"}
#
#     year = request.form.get('year')
#     semester = request.form.get('semester')
#
#     if year is None or semester is None:
#         value = {
#             "year": year,
#             "semester": semester
#         }
#         return make_response(jsonify({"message": "One of these is Null", "value": [value]}), 418, headers)
#
#     try:
#         file = request.files['upload']
#         if file and constant.allowed_academic_file(file.filename):
#             destination = UploadManager.upload_file(constant.ACADEMIC_FOLDER, file, year)
#         else:
#             return APIResponse.create_error_response("One of these is Null", "file not match", 418,)
#     except Exception as e:
#         print(e)
#         return APIResponse.create_error_response(str(e), "can not find a file with " + str(e.args[0]), 400)


class APIResponse:

    @staticmethod
    def create_error_exception(message: str, value, response_code: int):
        return make_response(jsonify({"message": message, "value": value}), response_code, constant.RESPONSE_HEADERS)

    @staticmethod
    def create_response(message: str, response: bool, data, response_code: int):
        return make_response(jsonify({"response": response, "message": message, "data": data}), response_code, constant.RESPONSE_HEADERS)

    @staticmethod
    def return_response(data):
        if data['response']:
            return APIResponse.create_response(data['message'], data['response'], data['data'], 200)
        else:
            return APIResponse.create_response(data['message'], data['response'], data['data'], 500)
