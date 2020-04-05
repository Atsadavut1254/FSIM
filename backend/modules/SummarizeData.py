# import helper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.inner_response_helper as inner_res_helper

import pandas as pd
import numpy as np


class SummarizeData:

    __instance = None

    @staticmethod
    def get_instance():
        if SummarizeData.__instance is None:
            SummarizeData()
        return SummarizeData.__instance

    def __init__(self):
        if SummarizeData.__instance is not None:
            raise Exception("This class is a singleton! summarize")
        else:
            SummarizeData.__instance = self

    # general part
    # summarize overview department (home modal)
    def summarize_overview_dept_home(self, dept_id):
        db = DatabaseHelper.get_instance()
        dept = db.get_department(dept_id)
        received = db.get_department_student_data(dept_id)

        if not received['response'] and not dept['response']:
            return received

        data = received['value']
        dept = dept['value']
        df = pd.DataFrame(data)

        branch_count = df.groupby('branch_id')['student_id'].count()
        status_branch_count = df.groupby(['branch_id', 'status_id'])['student_id'].count()
        status_year_count = df.groupby(['education_year', 'status_id'])['student_id'].count()

        # count branch
        branch = []
        for i in range(branch_count.size):
            index = branch_count.index[i]
            data = {
                'branch_id': index,
                'branch_student': str(branch_count[index])
            }
            branch.append(data)

        # count status branch
        status_branch = []
        for i in range(status_branch_count.size):
            index = status_branch_count.index[i]
            if i == 0:
                prev_branch = None
            else:
                prev_branch = status_branch_count.index[i - 1][0]

            if prev_branch != index[0]:
                data = {'branch_id': index[0], str(index[1]): str(status_branch_count[index])}
            else:
                data[str(index[1])] = str(status_branch_count[index])

            if prev_branch != index[0]:
                status_branch.append(data)

        # count status year
        status_year = []
        for i in range(status_year_count.size):
            index = status_year_count.index[i]
            if i == 0:
                prev_branch = None
            else:
                prev_branch = status_year_count.index[i - 1][0]

            if prev_branch != index[0]:
                data = {'education_year': str(index[0]), str(index[1]): str(status_year_count[index])}
            else:
                data[str(index[1])] = str(status_year_count[index])

            if prev_branch != index[0]:
                status_year.append(data)

        out_function_data = {
            'dept_name': dept[0]['dept_name'],
            'dept_id': dept[0]['dept_id'],
            'branch': branch,
            'by_year': status_year,
            'by_branch': status_branch
        }

        return inner_res_helper.make_inner_response(response=True, message="Developing", value=out_function_data)
