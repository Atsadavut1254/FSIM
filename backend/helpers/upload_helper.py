import os
from werkzeug.utils import secure_filename
from datetime import datetime

# import helper
import backend.helpers.inner_response_helper as inner_res_helper


def upload_file(store_folder, file, year):
    if not os.path.isdir(store_folder):
        os.makedirs(store_folder)

    name = str(year) + "_" + str(datetime.now().strftime("%d-%m-%Y")) + "_" + file.filename
    filename = secure_filename(name)
    destination = "/".join([store_folder, filename])

    try:
        file.save(destination)
        out = inner_res_helper.make_inner_response(response=True, message="File was Saved", value=destination)
    except Exception as e:
        out = inner_res_helper.make_inner_response(response=False, message=str(e), value=str(e.args[0]))
        print(e)

    return out
