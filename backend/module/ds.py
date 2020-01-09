import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user="root",
                               pw="",
                               db="import_df"))

df = pd.read_excel("../uploads/test_docs/Book2.xlsx", sheet_name='Sheet1')
# df = df.iloc[1:, :]
# df.to_sql('Book2', con=engine, if_exists='append', chunksize=1000)
print(df)
