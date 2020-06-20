#!/usr/bin/env python3
###########################################
from flask import g
from flask_jwt_extended import *
from werkzeug.security import *
from pymysql import *
###########################################

### DB 연결
def get_db():
    if 'db' not in g:
        g.db = connect(host="localhost", user="root", password="Dltkdals1!", db="LooKlendar", charset='utf8mb4', cursorclass=cursors.DictCursor)

### DB 해제
def close_db():
    db = g.pop('db', None)
    if db is not None:
        if db.open:
            db.close()

### 첫 DB 연결 (없으면 생성)
def init_db():
    db = connect(host="localhost", user="root", password="Dltkdals1!", charset='utf8mb4', cursorclass=cursors.DictCursor)

    try:
        with db.cursor() as cursor:
            sql = "CREATE DATABASE IF NOT EXISTS LooKlendar"
            cursor.execute(sql)
        db.commit()
    except Exception as ex:
        print("DB init Failed")
        print(ex)
    db.select_db('LooKlendar')

    #DB 테이블 생성
    with db.cursor() as cursor:
        sql = open("database/table/Looklendar_user.sql").read()
        cursor.execute(sql)
        sql = open("database/table/Looklendar_calendar.sql").read()
        cursor.execute(sql)
        sql = open("database/table/Looklendar_look.sql").read()
        cursor.execute(sql)
        sql = open("database/table/Looklendar_dailylook.sql").read()
        cursor.execute(sql)
        sql = open("database/table/Looklendar_comment.sql").read()
        cursor.execute(sql)
        sql = open("database/table/Looklendar_like.sql").read()
        cursor.execute(sql)
        sql = open("database/table/v_Looklendar_user.sql").read()
        cursor.execute(sql)
        sql = open("database/table/v_Looklendar_look.sql").read()
        cursor.execute(sql)
        
    db.commit()
    db.close()