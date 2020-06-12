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
from PIL import Image, ImageFile
#ImageFile.LOAD_TRUNCATED_IMAGES = True
#import time
#from werkzeug import *
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
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    DATE = request.form['date']
    files = request.files['file']
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
            look_data = (
                TITLE, PHOTO, sPHOTO, OUTER, TOP, BOT, SHOES, ACC, DATE, user['user_id']
            )
            for data in look_data:
                if data == "":
                    data = None
            # DB에 파일 추가
            file_result = look_insert(g.db, look_data)
            if file_result == "success":
                # 사진 저장
                files.save('.' + UPLOAD_PATH + file_check['original'])
                img = Image.open('.' + UPLOAD_PATH + file_check['original'])
                resize_img = img.resize((150, 150))
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
            STATUS = "SUCCESS with PHOTO",
            VALUES = PHOTO
        )
    else:
        PHOTO = sPHOTO = ""
        look_data = (
            TITLE, PHOTO, sPHOTO, OUTER, TOP, BOT, SHOES, ACC, DATE, user['user_id']
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
#파일 사이즈 측정 ##수정 필요
def files_size_check(Files):
    files_size = 0
    files_size += len(Files.read())
    #총 파일 크기 50MB 제한 
    if files_size < (30 * (1024 ** 2)):
        return True
    else:
        return False

# 파일 이름 변환 ##수정 필요
def file_name_encode(file_name):
    # 허용 확장자 / 길이인지 확인
    if secure_filename(file_name).split('.')[-1].lower() in IMG_EXTENSIONS and len(file_name) < 240:

        #원본 파일
        path_name = str(datetime.today().strftime("%Y%m%d%H%M%S%f")) + '_' + file_name
        
        # 미리보기 파일
        s_path_name = 'S-' + path_name

        return {"original": path_name, "resize": s_path_name}

    else:
        return None
#ok# 데일리 달력 수정
@BP.route('/look/modify', methods = ['POST'])
@jwt_required
def look__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    TITLE = request.form['title']
    PHOTO = request.form['photo']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    NUM = request.form['num']

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
    NUM = request.form['num']
    result = look_delete(g.db, NUM)
    
    ## 결과 전송
    return jsonify(
        RESULT = result
    )