import pymysql


class DatabaseConnection:

    def __init__(self):
        self.db_connection = pymysql.connect("localhost", "root", "", "fsim")

    def getAllSchoolData(self):
        cursor = self.db_connection.cursor()
        sql = "SELECT school.school_id, school.school_name, province.name, district.name, sub_district.name from (school left join sub_district on school.sub_district_id like sub_district.sub_district_id) as SA left join (province left join district on province.province_id like district.province_id) AS SB on "