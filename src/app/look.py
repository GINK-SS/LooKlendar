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
from PIL import Image
from werkzeug.utils import secure_filename
import datetime
###########################################
from db_func import *

BP = Blueprint('look', __name__)

UPLOAD_PATH = "/static/files/"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
IMG_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}


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
    
    #pprint(result)
    #result['event_date'] = result['event_date'].strftime("%m/%d/%Y")
    #pprint(result)

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
    TITLE = request.form['title']
    COLOR = request.form['color']
    DATE = request.form['date']
    PLACE = request.form['place']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    try:
        files = request.files['file']
    except:
        files = None
    # 제목과 상의는 필수 입력!!
    if TITLE == "":
        return jsonify(
            STATUS = "EMPTY TITLE"
        )
    if TOP == "":
        return jsonify(
            STATUS = "EMPTY TOP"
        )
        #look_default.png
    # 사진을 등록했다면
    if files:
        file_check = file_name_encode(files.filename)
        # 파일 확장자와 이름 길이 및 이름, 경로 정하기
        if file_check is not None:
            PHOTO = file_check['original']
            sPHOTO = file_check['resize']
            look_data = (
                TITLE, COLOR, user['user_id'], DATE, PLACE
            )
            for data in look_data:
                if data == "":
                    data = None
            look_data2 = (
                user['user_id'], DATE, PHOTO, sPHOTO, OUTER, TOP, BOT, SHOES, ACC
            )
            for data in look_data2:
                if data == "":
                    data = None
            # DB에 파일 추가
            file_result = look_insert(g.db, look_data, look_data2)
            if file_result == "success":
                # 사진 저장
                if PHOTO != "look_default.png":
                    files.save('.' + UPLOAD_PATH + file_check['original'])
                    img = Image.open('.' + UPLOAD_PATH + file_check['original'])
                    resize_img = img.resize((300, 300))
                    resize_img.save('.' + UPLOAD_PATH + file_check['resize'])
            else:
                return jsonify(
                    STATUS = "Can't Insert PHOTO DB"
                )
        else:
            return jsonify(
                STATUS = "Wrong PHOTO"
            )
        return jsonify(
            STATUS = "SUCCESS"
        )
    else:
        PHOTO = "look_default.png"
        sPHOTO = "S-look_default.png"
        look_data = (
            TITLE, COLOR, user['user_id'], DATE, PLACE
        )
        look_data2 = (
            user['user_id'], DATE, PHOTO, sPHOTO, OUTER, TOP, BOT, SHOES, ACC
        )
        for data in look_data2:
            if data == "":
                data = None
        func_result = look_insert(g.db, look_data, look_data2)

    
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
    NUM = request.form['num']
    TITLE = request.form['title']
    COLOR = request.form['color']
    DATE = request.form['date']
    PLACE = request.form['place']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    try:
        files = request.files['file']
    except:
        files = None
    
    # 제목과 상의는 필수 입력!!
    if TITLE == "":
        return jsonify(
            STATUS = "EMPTY TITLE"
        )
    if TOP == "":
        return jsonify(
            STATUS = "EMPTY TOP"
        )
    # 사진을 등록했다면
    if files:
        file_check = file_name_encode(files.filename)
        # 파일 확장자와 이름 길이 및 이름, 경로 정하기
        if file_check is not None:
            PHOTO = file_check['original']
            sPHOTO = file_check['resize']
            look_new_data = (
                TITLE, COLOR, DATE, PLACE, NUM
            )
            look_new_data2 = (
                PHOTO, sPHOTO, OUTER, TOP, BOT, SHOES, ACC, NUM
            )
            for data in look_new_data2:
                if data == "":
                    data = None
            # DB에 파일 추가
            file_result = look_modify(g.db, look_new_data, look_new_data2)
            if file_result == "SUCCESS":
                # 사진 저장
                files.save('.' + UPLOAD_PATH + file_check['original'])
                img = Image.open('.' + UPLOAD_PATH + file_check['original'])
                resize_img = img.resize((300, 300))
                resize_img.save('.' + UPLOAD_PATH + file_check['resize'])
            else:
                return jsonify(
                    STATUS = "Can't Insert PHOTO DB"
                )
        else:
            return jsonify(
                STATUS = "Wrong PHOTO"
            )
        return jsonify(
            STATUS = "SUCCESS"
        )
    else:
        look_new_data = (
            TITLE, COLOR, DATE, PLACE, NUM
        )
        look_new_data2 = (
            OUTER, TOP, BOT, SHOES, ACC, NUM
        )
        for data in look_new_data2:
            if data == "":
                data = None
        # DB에 파일 추가
        file_result = look_modify2(g.db, look_new_data, look_new_data2)
        if file_result == "SUCCESS":
            return jsonify(
                STATUS = "SUCCESS"
            )
        else:
            return jsonify(
                STATUS = "Can't Insert DB"
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