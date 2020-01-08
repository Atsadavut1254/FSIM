import pandas as pd


class DataManage:

    def readExcel(self, url):
        df = pd.read_excel(url, sheet_name='Sheet1')
        print(df)
