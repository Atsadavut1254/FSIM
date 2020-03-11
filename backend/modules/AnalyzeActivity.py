# this class to analyze Admission activity data.
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

from backend.modules.DatabaseConnection import DatabaseConnection


class AnalyzeActivity:

    def __init__(self):
        print("Activity")
