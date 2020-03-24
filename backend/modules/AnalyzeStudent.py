# this class to analyze Student data.
# to get data from database please use DatabaseConnection class and
# use method which provide the data that you want
# Example for get data
#  1. database = DatabaseConnection().get_instance()
#  2. variable_to_get_response_data = database.your_method()
# the response data is in JSON form it will have 3 part
# 1. response state (True/False) this part will send the state of query success or not
# 2. message this part will send the description of response sate
# 3. value this part will contain the data that you request if it success
# Finally, after process the data to send to api route please return the data in JSON Format like
# the response data that you receive. Thank you
# !!!!! Don't edit database_helper.py file, Please !!!!!

# NOTICE!! TODO()
# We have new helper to help you send your computing result. inner_response_helper is the name
# please use the helper to return the value to another method
# I imported the helper to this class as "inner_res_helper"
# to use the helper just call "inner_res_helper.make_inner_response()"
# and pass the argument like the receive data format reponse, message and value the description is above

# import helper
from backend.helpers.database_helper import DatabaseHelper
import backend.helpers.inner_response_helper as inner_res_helper
from collections import defaultdict

import pandas as pd
import json
class AnalyzeStudent:

    def __init__(self):
        print("Student")
    
    
    #this function returns student data and status student that analyze in 'depm'.
    # this function required department id
    def analyze_by_depm(self,depm):
        connect = DatabaseHelper()
        data=connect.get_all_student(depm)
        response=""
        message=""
        value={}
        if data['value']!=[]:
            df = self.set_status(pd.DataFrame(data['value']))
            num_student_depm=self.count_student_depm(df)
            df_brance=self.count_by_brance(df)
            df_status = df[['student_year','education_status']]
            df_status_branch = df[['branch','student_year','education_status']]
            df_count_status_all_brance=self.count_status(df_status)
            df_status_by_brance=self.status_by_brance(df)
            #set data
            value['all_stu_demp']=str(num_student_depm)
            value['brance']=[df_brance]
            value['status_by_year']=[df_count_status_all_brance]
            value['df_status_by_brance']=[df_status_by_brance]
            response=True
            message="Analyze Student Successfully"
        else : 
            response=False
            message="Analyze Student Failed"
        return inner_res_helper.make_inner_response(response, message, value)


    #this function return  academic results that analyze in 'depm'.
    # this function required department id
    def analyze_by_subject_depm(self,depm):
        connect = DatabaseHelper()
        data=connect.get_all_academic_record()
        response=""
        message=""
        value={}
        if data['value']!=[]:
            df = pd.DataFrame(data['value'])
            grouped= df.groupby( ['education_year','subject_code','grade'] ).size().unstack(fill_value=0)
            df_grouped=pd.DataFrame(grouped.stack().to_frame(name = 'count').reset_index())
            print(df_grouped)
            value['subject_by_year'] = [self.retro_dictify(df_grouped)]
            response=True
            message="Analyze Student Successfully"
        else :
            response=False
            message="Analyze Student Failed"
        return inner_res_helper.make_inner_response(response, message, value)



    
    def count_by_brance(self,df_depm):
        df_brance=df_depm.groupby('branch').size().to_dict()
        return df_brance

    
    def count_student_depm(self,df):
        num_student_depm=len(df.index)
        return num_student_depm


    def count_status(self,df):
        count_status_all_brance = df.groupby(['student_year', 'education_status']).size().unstack(fill_value=0).to_dict('index')
        return count_status_all_brance
    
    def status_by_brance(self,df):
        grouped= pd.DataFrame(df.groupby( ['branch','student_year','education_status'] ).size().to_frame(name = 'count').reset_index())
        data_analyze = self.retro_dictify(grouped)
        return data_analyze


    def set_status(self,df):
        return df.replace({'education_status' : { 1 : 'ปกติ', 2 : 'วิทยาฑัณฑ์', 3 : 'ตกออก' }})

        
    def retro_dictify(self,frame):
        d = {}
        for row in frame.values:
            here = d
            for elem in row[:-2]:
                if elem not in here:
                    here[elem] = {}
                here = here[elem]
            here[row[-2]] = row[-1]
        return d

# get_all_student() method for get student data
# get_all_academic_record() method get student academic record data

