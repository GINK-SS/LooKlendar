#!/usr/bin/env python3
###########################################
import sys
sys.path.insert(0,'./')
sys.path.insert(0,'./database')
sys.path.insert(0,'./apps')
from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from flask_cors import CORS
import time
###########################################
from db_func import *

BP = Blueprint('look', __name__)

#본인의 데일리 달력 반환
@BP.route('/API/V1/look/main', methods = ['POST'])
@jwt_required
def look__look():
    user = user_select(g.db, get_jwt_identity())
    
    result = look_select(g.db, user['user_id'])
    
    ## 결과 전송
    return jsonify(
        RESULT = result
    )

#본인의 데일리 달력에 저장
@BP.route('/API/V1/look/upload', methods = ['POST'])
@jwt_required
def look__upload():
    user = user_select(g.db, get_jwt_identity())
    TITLE = request.form['title']
    PHOTO = request.form['photo']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    DATE = request.form['date']
    
    #디비에 정보 삽입
    look_data = (
        TITLE, PHOTO, OUTER, TOP, BOT, SHOES, ACC, DATE
    )
    func_result = look_insert(g.db, user['user_id'], user_data)
    
    ## result를 fail로 초기화
    result = "fail"
        
    ## DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"

    ## 결과 전송
    return jsonify(
        STATUS = result
    )

#데일리 달력 수정 ##히오니한테 그 날의 날짜를 받는 걸로 일단 함
@BP.route('/API/V1/look/modify', methods = ['POST'])
@jwt_required
def look__modify():
    user = user_select(g.db, get_jwt_identity())
    TITLE = request.form['title']
    PHOTO = request.form['photo']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    NUM = request.form['num']

    look_new_data = (
        TITLE, PHOTO, OUTER, TOP, BOT, SHOES, ACC
    )
        result = look_modify(g.db, look_new_data, NUM)
    return jsonify(
        STATUS = "SUCCESS"
    )

#데일리 달력 삭제
@BP.route('/API/V1/look/delete', methods = ['POST'])
@jwt_required
def look__delete():
    user = user_select(g.db, get_jwt_identity())
    
    result = look_select(g.db, user['user_id'])
    
    ## 결과 전송
    return jsonify(
        RESULT = result
    )