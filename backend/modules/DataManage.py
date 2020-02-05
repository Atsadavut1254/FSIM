import pandas as pd
import pymysql
from sqlalchemy import create_engine

# import our module
from backend.modules.FSIMConstant import FSIMConstant


class DataManage:

    def __init__(self):
        self.constant = FSIMConstant()
        self.host = self.constant.get_host()
        self.db = self.constant.get_db()
        self.user = self.constant.get_user_db()
        self.password = self.constant.get_password_db()
        self.engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}"
                                    .format(user=self.user,
                                            pw=self.password,
                                            db=self.db,
                                            host=self.host))

    def readExcel(self, url):
        df = pd.read_excel(url, sheet_name='Sheet1')
        # column name in xlsx file must equal an attribute name in database
        # df.to_sql('Book2', con=self.engine, if_exists='append', chunksize=1000, index=False)
        print(df)
