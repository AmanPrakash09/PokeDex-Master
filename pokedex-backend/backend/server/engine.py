from dotenv import load_dotenv
import mysql.connector
import os

DOT_ENV_PATH = "../backend/.env"
load_dotenv(DOT_ENV_PATH)


class QueryEngine:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )

    def execute_query(self, query: str):
        cursor = self.conn.cursor()
        cursor.execute(query)
        try:
            self.conn.commit()
        except:
            pass
        return cursor.fetchall()


