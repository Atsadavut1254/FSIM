from flask import Blueprint, jsonify, request, make_response, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# import database connection
from backend.modules.DatabaseConnection import DatabaseConnection

# import data manager
from backend.modules.DataManage import DataManage

# import Upload manager
from backend.modules.UploadManager import UploadManager

# import application Constant
import backend.Constant as constant

from backend.modules.AnalyzeStudent import AnalyzeStudent


api_bp = Blueprint('api_bp', __name__, url_prefix='/api/v1')


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


@api_bp.route('/admission', methods=['POST'])
def insert_admission():
    # This api need "Year" as year , "Admission type" as admission_type and "Admission channel" as admission_channel to be a parameter
    headers = {"Content-type": "application/json"}

    year = request.form.get('year')
    admission_type = request.form.get('admission_type')
    admission_channel = request.form.get('admission_channel')

    if year is None or admission_type is None or admission_channel is None:
        value = {
            "year": year,
            "admission_type": admission_type,
            "admission_channel": admission_channel
        }
        return make_response(jsonify({"message": "One of these is Null", "value": [value]}), 418, headers)

    try:
        file = request.files['upload']
        if file and constant.allowed_admission_file(file.filename):
            destination = UploadManager.upload_file(constant.ADMISSION_FOLDER, file, year)
        else:
            return make_response(jsonify({"message": "Type of file is not match", "value": "file not match"}), 418,
                                 headers)
    except Exception as e:
        print(e)
        return make_response(jsonify({"message": str(e), "value": "can not find a file with " + str(e.args[0])}), 400,
                             headers)

    insert = False

    if destination['response']:
        dm = DataManage.getInstance()
        insert = dm.insert_admission(admission_type, admission_channel, year, destination['message'])

    if insert['response']:
        return make_response(jsonify({"response": True, "message": str(insert['message'])}), 200, headers)
    else:
        return make_response(jsonify({"response": False, "message": str(insert['message'])}), 500, headers)


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

    if data['response']:
        return make_response(jsonify({"response": data['response'], "message": data['message'], "data": data['data']}),
                             200, headers)
    else:
        return make_response(jsonify({"response": data['response'], "message": data['message'], "data": data['data']}),
                             500, headers)


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

