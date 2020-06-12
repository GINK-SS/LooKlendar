#!/usr/bin/env python3
###########################################
import sys
sys.path.insert(0,'./')
sys.path.insert(0,'./database')
sys.path.insert(0,'./app')
from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from flask_cors import CORS
#import time
###########################################
from db_func import *

BP = Blueprint('look', __name__)

#ok# 본인의 데일리 달력 반환
@BP.route('/look/main', methods = ['POST'])
@jwt_required
def look__look():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    result = look_select(g.db, user['user_id'])
    
    ## 결과 전송
    return jsonify(
        RESULT = result
    )

#ok# 본인의 데일리 달력에 저장
@BP.route('/look/upload', methods = ['POST'])
@jwt_required
def look__upload():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    TITLE = request.get_json()['title']
    PHOTO = request.get_json()['photo']
    OUTER = request.get_json()['outer']
    TOP = request.get_json()['top']
    BOT = request.get_json()['bot']
    SHOES = request.get_json()['shoes']
    ACC = request.get_json()['acc']
    DATE = request.get_json()['date']
    
    # 제목과 상의는 필수 입력!!
    if TITLE == "":
        return jsonify(
            STATUS = "EMPTY TITLE"
        )
    if TOP == "":
        return jsonify(
            STATUS = "EMPTY TOP"
        )
    
    #디비에 정보 삽입
    look_data = (
        TITLE, PHOTO, OUTER, TOP, BOT, SHOES, ACC, DATE, user['user_id']
    )
    # 제목과 상의 및 DATE, user_id 제외한 나머지 입력 안했을 시 NULL 입력
    for data in look_data:
        if data == "":
            data = None

    func_result = look_insert(g.db, look_data)
    
    ## result를 fail로 초기화
    result = "fail"
        
    ## DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"

    ## 결과 전송
    return jsonify(
        STATUS = result
    )

#ok# 데일리 달력 수정
@BP.route('/look/modify', methods = ['POST'])
@jwt_required
def look__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    TITLE = request.get_json()['title']
    PHOTO = request.get_json()['photo']
    OUTER = request.get_json()['outer']
    TOP = request.get_json()['top']
    BOT = request.get_json()['bot']
    SHOES = request.get_json()['shoes']
    ACC = request.get_json()['acc']
    NUM = request.get_json()['num']

    # 제목과 상의는 필수 입력!!
    if TITLE == "":
        return jsonify(
            STATUS = "EMPTY TITLE"
        )
    if TOP == "":
        return jsonify(
            STATUS = "EMPTY TOP"
        )
    
    look_new_data = (
        TITLE, PHOTO, OUTER, TOP, BOT, SHOES, ACC, NUM
    )
    # 제목과 상의 및 num 제외한 나머지 입력 안했을 시 NULL 입력
    for data in look_new_data:
        if data == "":
            data = None

    result = look_modify(g.db, look_new_data)

    if result == "SUCCESS":
        return jsonify(
            STATUS = "SUCCESS"
        )

#ok# 데일리 달력 삭제
@BP.route('/look/delete', methods = ['POST'])
@jwt_required
def look__delete():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    NUM = request.get_json()['num']
    result = look_delete(g.db, NUM)
    
    ## 결과 전송
    return jsonify(
        RESULT = result
    )