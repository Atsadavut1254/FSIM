import pandas as pd

read = pd.read_excel('../../uploads/chm.xlsx', converters={'รหัส': str}, sheet_name=None)

sheet_name = list(read.keys())

# sheet = read[sheet_name[0]]
# sheet.dropna(how='all', axis=1, inplace=True)
# header_list = list(sheet.columns)
# header_list = header_list[1:]

# student id, subject code, grade, semester year (academic record)
# student id, gpa, semester, education_year
semester = 1
year = 2561
academic_record = []
gpa_record = []


def change_to_list_no_time(load):
    output_list = []
    for data in load:
        temp = list(data.values())
        temp = list(map(str, temp))
        output_list.append(tuple(temp))
    return output_list

for number in range(len(sheet_name)):
    # get sheet form workbook
    sheet = read[sheet_name[number]]
    sheet.dropna(how='all', axis=1, inplace=True)
    out = sheet.to_json(orient='index')
    # read data from a sheet
    for i in range(sheet.shape[0]):
        temp = sheet.iloc[i, :]
        temp = temp.dropna()
        temp = temp.reset_index()
        subject_list = list(temp.index)
        std_id = temp.iloc[0, 1]
        gpa = [std_id, temp.iloc[-2, 1], semester, year]
        gpa_record.append(gpa)
        # get data per student
        for j in range(1, len(subject_list)-2):
            data = [std_id]
            code = temp.iloc[j, 0][:6]
            grade = temp.iloc[j, 1]
            data.append(code)
            data.append(grade)
            data.append(semester)
            data.append(year)
            data = list(map(str, data))
            academic_record.append(tuple(data))

# myout = change_to_list_no_time(academic_record)
