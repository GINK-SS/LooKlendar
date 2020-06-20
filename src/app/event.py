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
###########################################
from db_func import *

BP = Blueprint('event', __name__)

# 일정 달력 반환
@BP.route('/event/main', methods = ['POST'])
@jwt_required
def event__main():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    result = event_select(g.db, user['user_id'])

    return jsonify(
        RESULT = result
    )

# 일정 달력 입력
@BP.route('/event/upload', methods = ['POST'])
@jwt_required
def event__upload():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    TITLE = request.get_json()['title']
    COLOR = request.get_json()['color']
    DATE = request.get_json()['date']
    PLACE = request.get_json()['place']
    ## 아무것도 입력 안했을 시 돌려보내기 ##
    # TITLE에 입력 안했을 때
    if TITLE == "":
        return jsonify(
            STATUS = "EMPTY TITLE"
        )
    # 날짜를 입력 안했을 때
    if DATE == "":
        return jsonify(
            STATUS = "EMPTY DATE"
        )
    # 장소 입력 안했을 경우 NULL 값 입력
    if PLACE == "":
        PLACE = None
    #디비에 정보 삽입
    event_data = (
        TITLE, COLOR, DATE, PLACE, user['user_id']
    )
    func_result = event_insert(g.db, event_data)
    
    ## result를 fail로 초기화
    result = "fail"
        
    ## DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"

    ## 결과 전송
    return jsonify(
        STATUS = result
    )

#일정 달력 수정 
@BP.route('/event/modify', methods = ['POST'])
@jwt_required
def event__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    TITLE = request.get_json()['title']
    DATE = request.get_json()['date']
    COLOR = request.get_json()['color']
    PLACE = request.get_json()['place']
    NUM = request.get_json()['num']

    ## 아무것도 입력 안했을 시 돌려보내기 ##
    # TITLE에 입력 안했을 때
    if TITLE == "":
        return jsonify(
            STATUS = "EMPTY TITLE"
        )
    # 날짜를 입력 안했을 때
    if DATE == "":
        return jsonify(
            STATUS = "EMPTY DATE"
        )
    # 장소 입력 안했을 경우 NULL 값 입력
    if PLACE == "":
        PLACE = None
    event_new_data = (
        TITLE, DATE, COLOR, PLACE, NUM
    )
    result = event_modify(g.db, event_new_data)
    return jsonify(
        STATUS = "SUCCESS"
    )

#일정 달력 삭제
@BP.route('/event/delete', methods = ['POST'])
@jwt_required
def event__delete():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    NUM = request.get_json()['num']
    result = event_delete(g.db, NUM)
    
    ## 결과 전송
    return jsonify(
        RESULT = result
    )