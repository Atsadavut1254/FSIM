DATABASE_HOST = "127.0.0.1"
DATABASE_NAME = "FSIM"
DATABASE_USER = "root"
DATABASE_PASSWORD = ""
UPLOAD_FOLDER = "./uploads/"
ADMISSION_FOLDER = UPLOAD_FOLDER + "admission"
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

SECRET_KEY = "FSIM2020"


def allowed_admission_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS