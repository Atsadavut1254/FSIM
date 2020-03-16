
DATABASE_HOST = "<<HOST>>"
DATABASE_NAME = "<<NAME>>"
DATABASE_USER = "<<USER>>"
DATABASE_PASSWORD = "<<PASS>>"


UPLOAD_FOLDER = "./uploads/"
ADMISSION_FOLDER = UPLOAD_FOLDER + "admission"
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

SECRET_KEY = "FSIM2020"


def allowed_admission_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS