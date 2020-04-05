from backend.helpers.database_helper import DatabaseHelper
import backend.Constant as Constant

print(Constant.DATABASE_NAME)

import pandas as pd

db = DatabaseHelper.get_instance()
received = db.get_department_student_data("mth")

data = received['value']
df = pd.DataFrame(data)

branch_count = df.groupby('branch_id')['student_id'].count()
status_branch_count = df.groupby(['branch_id', 'status_id'])['student_id'].count()
status_year_count = df.groupby(['education_year', 'status_id'])['student_id'].count()

# count branch
branch = []
for i in range(branch_count.size):
    index = branch_count.index[i]
    # print(branch_count[index])
    data = {
        'branch_id': index,
        'branch_student': str(branch_count[index])
    }
    branch.append(data)

status_branch = []
for i in range(status_branch_count.size):
    index = status_branch_count.index[i]
    if i == 0:
        prev_branch = None
    else:
        prev_branch = status_branch_count.index[i-1][0]

    if prev_branch != index[0]:
        data = {'branch_id': index[0], str(index[1]): str(status_branch_count[index])}
    else:
        data[str(index[1])] = str(status_branch_count[index])

    if prev_branch != index[0]:
        status_branch.append(data)

status_year = []
for i in range(status_year_count.size):
    index = status_year_count.index[i]
    if i == 0:
        prev_branch = None
    else:
        prev_branch = status_year_count.index[i-1][0]

    if prev_branch != index[0]:
        data = {'education_year': index[0], str(index[1]): str(status_year_count[index])}
    else:
        data[str(index[1])] = str(status_year_count[index])

    if prev_branch != index[0]:
        status_year.append(data)

out_function_data = {
    'branch': branch,
    'by_year': status_year,
    'by_branch': branch
}

print(out_function_data)

