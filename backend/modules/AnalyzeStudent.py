# this class to analyze Student data.
# to get data from database please use DatabaseConnection class and
# use method which provide the data that you want
# Example for get data
#  1. connect = DatabaseConnection()
#  2. variable_to_get_response_data = connect.your_method()
# the response data is in JSON form it will have 3 part
# 1. response state (True/False) this part will send the state of query success or not
# 2. message this part will send the description of response sate
# 3. data this part will contain the data that you request if it success
# Finally, after process the data to send to api route please return the data in JSON Format like
# the response data that you receive. Thank you
# !!!!! Don't edit DatabaseConnection.py file, Please !!!!!
from collections import defaultdict

from backend.modules.DatabaseConnection import DatabaseConnection
import pandas as pd
import json
class AnalyzeStudent:

    def __init__(self):
        print("analyze student start!!!") 
      
      

    #this function returns student data and status student that analyze in 'depm'.
    def analyze_by_depm(self,depm):
        connect = DatabaseConnection()
        data=connect.get_all_student()
        df = pd.DataFrame(data['data'])
        df_depm1 = df.loc[df['department'] == 'ภาควิชาคณิตศาสตร์']
        num_student_depm=self.count_student_depm(df_depm1)
        df_brance=self.count_by_brance(df_depm1)
        data={}
        data['all_stu_demp']=str(num_student_depm)
        data['brance']=[df_brance]
        out_response = {}
        out_response['response'] = False
        out_response['message'] = ""
        out_response['data'] = data
        return out_response


     #this function return  academic results that analyze in 'depm'.
    def analyze_by_subject_depm(self,depm):
        connect = DatabaseConnection()
        data=connect.get_all_academic_record()
        df = pd.DataFrame(data['data'])
        grouped= pd.DataFrame(df.groupby( ['education_year','subject_code','grade'] ).size().to_frame(name = 'count').reset_index())
        tree = lambda: defaultdict(tree)
        d = tree()
        for row in grouped.itertuples(index=False):
            d[(row.education_year, row.subject_code)].update({row.grade: row.count})

        data = [{k[0]:[ {k[1]: dict(v)}]} for k, v in d.items()]
        out_response = {}
        out_response['response'] = False
        out_response['message'] = ""
        out_response['data'] = data
        return out_response


    #for count number of student by brance
    def count_by_brance(self,df_depm):
        df_brance=dict(df_depm.groupby('branch').size())
        dic_df_brance=self.iterdict(df_brance)
        return dic_df_brance

    #for count all student by brance
    def count_student_depm(self,df):
        num_student_depm=len(df.index)
        return num_student_depm

    #for convert dic int to string
    def iterdict(self,dic):
        for k, v in dic.items():
            if isinstance(v, dict):
                iterdict(v)
            else:
                if type(v) !=str:
                    v = str(v)
                dic.update({k: v})
        return dic

# get_all_student() method for get student data
# get_all_academic_record() method get student academic record data
