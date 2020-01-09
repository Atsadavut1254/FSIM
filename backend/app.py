from flask import Flask, request, render_template, jsonify, redirect, url_for, sessions
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import jwt
import os

# import our module
from backend.module.DataManage import DataManage
from backend.module.DatabaseConnection import DatabaseConnection

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

upload_folder = './uploads'


app = Flask('__name__', static_folder='../frontend/build/static', template_folder='../frontend/build')
app.config['UPLOAD_FOLDER'] = upload_folder
app.config['JSON_AS_ASCII'] = False

CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('index.html')


@app.route('/std')
def std():
    return render_template('index.html')


@app.route('/api/upload', methods=['POST'])
def fileUpload():

    target = os.path.join(upload_folder, 'test_docs')
    if not os.path.isdir(target):
        os.makedirs(target)
    logger.info("welcome to upload")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)

    # read excel file when upload was finished
    data = DataManage()
    data.readExcel(destination)
    # print(destination)
    # sessions['uploadFilePath'] = destination
    response = "Whatever you wish too return"
    return jsonify({'res': response})


@app.route('/api/read')
def read_excel():
    data = DataManage()
    path = "uploads/test_docs/Book2.xlsx"
    data.readExcel(path)
    return "Hello"


# api path

@app.route('/api/getallschool', methods=['GET'])
def get_all_school():
    connect = DatabaseConnection()
    data = connect.get_all_school_data()

    return jsonify({"data": data})


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)

# CORS(app, expose_headers='Authorization')