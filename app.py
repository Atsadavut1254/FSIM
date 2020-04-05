from flask import Flask, render_template, jsonify, request, make_response
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
import logging
import jwt
import os
import datetime
from functools import wraps
from flask_cors import CORS

# import modules
from backend.modules.old_DatabaseConnection import DatabaseConnection

# import blueprint
from backend.api import api_routes
from backend.api import admin_api_routes

# import Constant
import backend.Constant as constant

# set log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FSIM")

# create flask app
app = Flask(__name__, static_folder='frontend/build/static', template_folder='frontend/build')
app.config['UPLOAD_FOLDER'] = constant.UPLOAD_FOLDER

# to set json encode
app.config['JSON_AS_ASCII'] = False
app.config['SECRET_KEY'] = constant.SECRET_KEY

# setup blueprint
app.register_blueprint(api_routes.api_bp)
app.register_blueprint(admin_api_routes.admin_bp)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000/*"}})


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            print(data['staff_id'])
            connect = DatabaseConnection()
            result = connect.get_user(data['staff_id'])
            current_user = result

        except:
            return jsonify({'message': 'Token is missing'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# route
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('index.html')


@app.route('/std')
def std():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
