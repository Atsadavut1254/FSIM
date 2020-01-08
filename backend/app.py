from flask import Flask, request, render_template, jsonify, redirect, url_for, sessions
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import jwt
import os
from backend.module.DataManage import DataManage

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

upload_folder = './uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask('__name__')
app.config['UPLOAD_FOLDER'] = upload_folder

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
    path = "uploads/test_docs/Book1.xlsx"
    data.readExcel(path)
    return "Hello"


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)

# CORS(app, expose_headers='Authorization')