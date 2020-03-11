import os
from werkzeug.utils import secure_filename
from datetime import datetime
import backend.Constant as constant


class UploadManager:

    @staticmethod
    def upload_file(store_folder, file, year):
        if not os.path.isdir(store_folder):
            os.makedirs(store_folder)

        name = str(year) + "_" + str(datetime.now().strftime("%d-%m-%Y")) + "_" + file.filename
        filename = secure_filename(name)
        destination = "/".join([store_folder, filename])

        out_response = {}
        try:
            file.save(destination)
            out_response['response'] = True
            out_response['message'] = destination
        except Exception as e:
            out_response['response'] = False
            out_response['message'] = str(e)
            out_response['value'] = str(e.args[0])
            print(e)

        return out_response
