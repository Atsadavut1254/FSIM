import pandas as pd
import pymysql
from sqlalchemy import create_engine
import os

import backend.Constant


class DataManage:
    __constant = backend.Constant
    __host = __constant.DATABASE_HOST
    __db = __constant.DATABASE_NAME
    __user = __constant.DATABASE_USER
    __password = __constant.DATABASE_PASSWORD
    __engine = None
    __instance = None

    @staticmethod
    def getInstance():
        if DataManage.__instance is None:
            DataManage()
        return DataManage.__instance

    def __init__(self):
        if DataManage.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            if self.__engine is None:
                self.__engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}"
                                              .format(user=self.__user,
                                                    pw=self.__password,
                                                    db=self.__db,
                                                    host=self.__host))
            DataManage.__instance = self

    def readExcel(self, url):
        df = pd.read_excel(url, sheet_name='Sheet1')
        # column name in xlsx file must equal an attribute name in database
        # df.to_sql('Book2', con=self.engine, if_exists='append', chunksize=1000, index=False)
        print(df)

    def insert_admission(self, type, channel, year, url):
        df = pd.read_excel(url, sheet_name='Sheet1')

        out_response = {}

        try:
            df = df.loc[1:,
                 ['เลขที่ใบสมัคร', 'หมายเลขบัตรประชาชน', 'คำนำหน้านาม(ไทย)', 'ชื่อ(ไทย)', 'นามสกุล(ไทย)', 'GPAX',
                  'รหัสสถานศึกษา', 'สาขาวิชาที่สมัคร', 'เหตุผลในการสละสิทธิ์']]
            df.rename(columns={'เลขที่ใบสมัคร': 'application_no', 'หมายเลขบัตรประชาชน': 'national_id',
                               'คำนำหน้านาม(ไทย)': 'gender', 'ชื่อ(ไทย)': 'firstname', 'นามสกุล(ไทย)': 'lastname',
                               'รหัสสถานศึกษา': 'school_id', 'สาขาวิชาที่สมัคร': 'branch',
                               'เหตุผลในการสละสิทธิ์': 'decision'}, inplace=True)
        except Exception as e:
            print(e)
            out_response['response'] = False
            out_response['message'] = "Please check your file or table head " + str(e.args[0])
            return out_response

        df.loc[df['gender'] == 'นาย', ['gender']] = 'male'
        df.loc[df['gender'].str.contains('นาง'), ['gender']] = 'female'
        df['admission_type'] = type
        df['admission_channel'] = channel
        df['year'] = year
        df['school_id'] = '0010039990'

        branch = {
            1: "คณิตศาสตร์",
            2: "วิทยาการคอมพิวเตอร์ประยุกต์",
            3: "สถิติ",
            4: "เคมี",
            5: "จุลชีววิทยา",
            6: "วิทยาศาสตร์และเทคโนโลยีการอาหาร",
            7: "ฟิสิกส์ประยุกต์"
        }

        for i in branch:
            b = branch[i]
            if df.loc[df['branch'].str.contains(b), ['branch']].shape[0] > 0:
                df.loc[df['branch'].str.contains(b), ['branch']] = str(i)

        df.loc[df['decision'].notnull(), ['decision']] = -1
        df['decision'].fillna(1, inplace=True)

        try:
            df.to_sql('admission', con=self.__engine, if_exists='append', chunksize=1000, index=False)
            out_response['response'] = True
            out_response['message'] = "Insert data to database successful"
            return out_response
        except Exception as e:
            print(e.args[0])
            out_response['response'] = False
            out_response['message'] = str(e.args[0])
            return out_response
