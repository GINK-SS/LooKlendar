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
    ######### 관리자 아이디 생성 ##########
        sql = "SELECT * FROM Looklendar_user WHERE user_id = 'admin';"
        cursor.execute(sql)
        ad1 = cursor.fetchone()
        
        if not ad1:
            sql = "INSERT INTO Looklendar_user VALUES('admin', %s, 'looklendar@gmail.com', '운영자', '운영자', '1997-01-01', '1', NOW(), 'look_default.png');"
            cursor.execute(sql, (generate_password_hash("looklendar"),))
    
    ######### 테스트 아이디 생성 ##########
        sql = "SELECT * FROM Looklendar_user WHERE user_id = 'test01';"
        cursor.execute(sql)
        ad2 = cursor.fetchone()
        if not ad2:
            sql = "INSERT INTO Looklendar_user VALUES('test01', %s, 'test01@looklendar.com', '이상민', '상민이는자몽이좋아', '1997-11-25', '1', NOW(), 'sangmin.jpeg');"
            cursor.execute(sql, (generate_password_hash("1234"),))
        
        sql = "SELECT * FROM Looklendar_user WHERE user_id = 'test02';"
        cursor.execute(sql)
        ad3 = cursor.fetchone()
        if not ad3:
            sql = "INSERT INTO Looklendar_user VALUES('test02', %s, 'test02@looklendar.com', '임희원', '이미원', '1997-06-05', '1', NOW(), 'heewon.png');"
            cursor.execute(sql, (generate_password_hash("1234"),))
        
        sql = "SELECT * FROM Looklendar_user WHERE user_id = 'test03';"
        cursor.execute(sql)
        ad4 = cursor.fetchone()
        if not ad4:
            sql = "INSERT INTO Looklendar_user VALUES('test03', %s, 'test03@looklendar.com', '김수정', '크리스탈', '1998-10-22', '2', NOW(), 'hayoung.jpeg');"
            cursor.execute(sql, (generate_password_hash("1234"),))   
        
        sql = "SELECT * FROM Looklendar_user WHERE user_id = 'test04';"
        cursor.execute(sql)
        ad5 = cursor.fetchone()
        if not ad5:
            sql = "INSERT INTO Looklendar_user VALUES('test04', %s, 'test04@looklendar.com', '송하영', '송하빵', '1997-09-29', '2', NOW(), 'look_default.png');"
            cursor.execute(sql, (generate_password_hash("1234"),))
    db.commit()
    db.close()