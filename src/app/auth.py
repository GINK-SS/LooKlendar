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
import datetime
###########################################
from db_func import *

BP = Blueprint('auth', __name__)

UPLOAD_PATH = "/static/files/"
IMG_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}

#ok#회원가입
@BP.route('/auth/sign_up', methods = ['POST'])
def auth__sign_up():
    ID = request.form['id']
    PW = request.form['pw']
    PW2 = request.form['pw2']
    EMAIL = request.form['email']
    NAME = request.form['name']
    NICK = request.form['nick']
    BIRTH = request.form['birth']
    GENDER = request.form['gender']
    try:
        files = request.files['file']
    except:
        files = None
        
    #ok# 아이디가 너무 길면 돌려보낸다
    if len(ID) > 20:
        return jsonify(
            STATUS = "LONG ID"
        )
    #ok# 아이디가 너무 짧으면 돌려보낸다
    if len(ID) < 6:
        return jsonify(
            STATUS = "SHORT ID"
        )
    #ok# 아이디 중복확인 (대소문자 구별 X)
    id_result = user_id_check(g.db, ID)
    if id_result == "exist":
        return jsonify(
            STATUS = "ID EXIST"
        )
    #ok# 아이디에 한글 혹은 특수문자가 포함되어 있는지 확인
    id_hangul = isHangul(ID)
    id_special = isSpecial(ID)
    if id_hangul or id_special:
        return jsonify(
            STATUS = "Wrong ID"
        )
    #ok# 아이디 공백 확인
    id_blank = isBlank(ID)
    if id_blank:
        return jsonify(
            STATUS = "BLANK ID"
        )
    #ok# 닉네임 중복확인 (대소문자 구별 X)
    nick_result = user_nick_check(g.db, NICK)
    if nick_result == "exist":
        return jsonify(
            STATUS = "NICK EXIST"
        )
    #ok# 이메일에 한글 혹은 특수문자가 포함되어 있거나 이메일 형식이 맞는지 확인
    email_hangul = isHangul(EMAIL)
    email_special = is_emailSpecial(EMAIL)
    if email_hangul or email_special or not is_emailFormat(EMAIL):
        return jsonify(
            STATUS = "Wrong EMAIL or NOT EMAIL FORMAT"
        )
    #ok# 오타방지용 비밀번호 두번 입력 후 일치 확인
    if PW != PW2:
        return jsonify(
            STATUS = "PW MATCH FAIL"
        )
    #ok# 이메일 중복확인 (대소문자 구별 X)
    email_result = user_email_check(g.db, EMAIL)
    if email_result == "exist":
        return jsonify(
            STATUS = "EMAIL EXIST"
        )
    #ok# 이름에 특수문자나 자음 혹은 모음이 포함되어 있는지 확인
    name_special = isSpecial(NAME)
    if name_special or isHangulzmo(NAME):
        return jsonify(
            STATUS = "Wrong NAME"
        )
    #ok# 닉네임에 자음 혹은 모음이 포함되어 있는지 확인
    if isHangulzmo(NICK):
        return jsonify(
            STATUS = "Wrong NICK"
        )
    ##### ok # 입력하지 않은 것 확인 ###########
    #######################################
    #ok# 아이디를 입력하지 않았으면 돌려보낸다
    if ID == "":
        return jsonify(
            STATUS = "INSERT ID"
        )
    #ok# 비밀번호를 입력하지 않았으면 돌려보낸다
    if PW == "":
        return jsonify(
            STATUS = "INSERT PW"
        )
    #ok# 이메일을 입력하지 않았으면 돌려보낸다
    if EMAIL == "":
        return jsonify(
            STATUS = "INSERT EMAIL"
        )
    #ok# 사용자 이름을 입력하지 않았으면 돌려보낸다
    if NAME == "":
        return jsonify(
            STATUS = "INSERT NAME"
        )
    #ok# 닉네임을 입력하지 않았으면 돌려보낸다
    if NICK == "":
        return jsonify(
            STATUS = "INSERT NICK"
        )

    ##### 글자 수 제한 ###########
    ###########################
    #ok# 비밀번호가 너무 길면 돌려보낸다
    if len(PW) > 100:
        return jsonify(
            STATUS = "LONG PW"
        )
    #ok# 이메일이 너무 길면 돌려보낸다
    if len(EMAIL) > 30:
        return jsonify(
            STATUS = "LONG EMAIL"
        )
    #ok# 사용자 이름이 너무 길면 돌려보낸다
    if len(NAME) > 20:
        return jsonify(
            STATUS = "LONG NAME"
        )
    #ok# 닉네임이 너무 길면 돌려보낸다
    if len(NICK) > 20:
        return jsonify(
            STATUS = "LONG NICK"
        )
    ########################    
    #디비에 정보 삽입
    #ok# 생년월일을 입력하지 않았다면 NULL 입력
    if BIRTH == "":
        BIRTH = None
    else:
        #ok# 입력했을 시 올바르게 입력했는지 확인
        if birth_check(BIRTH) == "Wrong":
            return jsonify(
                STATUS = "Wrong BIRTH"
            )
    # 사진 등록 했다면 (등록 안했으면 기본이미지)
    if files:
        file_check = file_name_encode(files.filename)
        # 확장자 및 경로 및 이름 생성
        if file_check is not None:
            PHOTO = file_check['original']
        else:
            return jsonify(
                STATUS = "Wrong PHOTO"
            )
        user_data = (
            ID, generate_password_hash(PW), EMAIL, NAME, NICK, BIRTH, GENDER, PHOTO
        )
        func_result = user_insert(g.db, user_data)
        if func_result == "success":
            if PHOTO != "user_image1.jpg":
                files.save('.' + UPLOAD_PATH + file_check['original'])        
    #ok# 사진 첨부 안했다면 NULL 입력
    else:
        PHOTO = "user_image1.jpg"
        user_data = (
            ID, generate_password_hash(PW), EMAIL, NAME, NICK, BIRTH, GENDER, PHOTO
        )
        func_result = user_insert(g.db, user_data)
    
    # result를 fail로 초기화
    result = "fail"
        
    # DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"
    else:
        return jsonify(
            STATUS = result
        )
    # 결과 전송
    return jsonify(
        STATUS = result,
        access_token = create_access_token(identity = ID, expires_delta=False)
    )


#ok# 로그인
@BP.route('/auth/login', methods = ['POST'])
def auth__login():
    ID = request.get_json()['id']
    PW = request.get_json()['pw']
    
    #ok# ID로 DB 접속 후 유저 있는지 확인
    user = user_select(g.db, ID)
    #ok# DB에 ID가 없다면 없다고 출력
    if user == "NOT FOUND":
        return jsonify(
            STATUS = "INCORRECT ID"
        )
    #ok# DB에 ID가 있다면
    else:
        # 비밀번호 확인 후 로그인 성공 및 토큰 생성
        if check_password_hash(user['user_pw'], PW):
            access_token = create_access_token(identity = ID, expires_delta=False)
            return jsonify(
                STATUS = "SUCCESS",
                access_token = access_token
            ), 200
        # 비밀번호 불일치 시 일치하지 않다고 출력
        else:
            return jsonify(
                STATUS = "INCORRECT PW"
            )
    
#ok# 회원정보수정 ##
@BP.route('/auth/modify', methods = ['POST'])
@jwt_required
def auth__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    NICK = request.form['nick']
    EMAIL = request.form['email']
    BIRTH = request.form['birth']
    GENDER = request.form['gender']
    REMOVE = request.form['remove']
    try:
        files = request.files['file']
    except:
        files = None

    # 닉네임 중복확인 (대소문자 구별 X, 본인의 기존 닉네임 제외)
    nick_result = user_nick_check2(g.db, NICK, user['user_id'])
    if nick_result == "exist":
        return jsonify(
            STATUS = "NICK EXIST"
        )
    #ok# 이메일 중복확인 (대소문자 구별 X, 본인의 기존 이메일은 제외)
    email_result = user_email_check2(g.db, EMAIL, user['user_id'])
    if email_result == "exist":
        return jsonify(
            STATUS = "EMAIL EXIST"
        )
    #ok# 이메일에 한글 혹은 특수문자가 포함되어 있거나 이메일 형식이 맞는지 확인
    email_hangul = isHangul(EMAIL)
    email_special = is_emailSpecial(EMAIL)
    if email_hangul or email_special or not is_emailFormat(EMAIL):
        return jsonify(
            STATUS = "Wrong EMAIL or NOT EMAIL FORMAT"
        )
    ##ok## 수정할 때 입력 여부 확인 ##
    # 닉네임을 입력하지 않았으면 돌려보낸다
    if NICK == "":
        return jsonify(
            STATUS = "INSERT NICK"
        )
    #ok# 이메일을 입력하지 않았으면 돌려보낸다
    if EMAIL == "":
        return jsonify(
            STATUS = "INSERT EMAIL"
        )
    #ok# 생년월일을 입력하지 않았다면 NULL 입력
    if BIRTH == "":
        BIRTH = None
    else:
        #ok# 입력했을 시 올바르게 입력했는지 확인
        if birth_check(BIRTH) == "Wrong":
            return jsonify(
                STATUS = "Wrong BIRTH"
            )
    ##ok## 수정할 때 글자 수 제한 ##
    # 닉네임이 너무 길면 돌려보낸다
    if len(NICK) > 20:
        return jsonify(
            STATUS = "LONG NICK"
        )
    #ok# 이메일이 너무 길면 돌려보낸다
    if len(EMAIL) > 30:
        return jsonify(
            STATUS = "LONG EMAIL"
        )
    #ok# 사진 등록을 했다면
    if files:
        file_check = file_name_encode(files.filename)
        # 확장자 및 경로 및 이름 생성
        if file_check is not None:
            PHOTO = file_check['original']
        else:
            return jsonify(
                STATUS = "Wrong PHOTO"
            )
        user_new_data = (
            EMAIL, NICK, BIRTH, GENDER, PHOTO, user['user_id']
        )
        result = user_modify(g.db, user_new_data)
        if result == "SUCCESS":
            files.save('.' + UPLOAD_PATH + file_check['original'])
            return jsonify(
                STATUS = "SUCCESS"
            )
    #ok# 사진 첨부 안했다면 NULL 입력
    else:
        if REMOVE == "1":
            PHOTO = "user_image1.jpg"
            user_new_data = (
                EMAIL, NICK, BIRTH, GENDER, PHOTO, user['user_id']
            )
            result = user_modify(g.db, user_new_data)
        else:
            user_new_data = (
            EMAIL, NICK, BIRTH, GENDER, user['user_id']
        )
            result = user_modify2(g.db, user_new_data)
        if result == "SUCCESS":
            return jsonify(
                STATUS = "SUCCESS"
            )
# 비밀번호 변경
@BP.route('/auth/modify_pw', methods = ['POST'])
@jwt_required
def auth__modify_pw():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    PW = request.get_json()['pw']
    PW2 = request.get_json()['pw2']
    #ok# 오타방지용 비밀번호 두번 입력 후 일치 확인
    if PW != PW2:
        return jsonify(
            STATUS = "PW MATCH FAIL"
        )
    result = user_pw_modify(g.db, generate_password_hash(PW), user['user_id'])
    if result == "SUCCESS":
        return jsonify(
            STATUS = "SUCCESS"
        )

#ok#아이디 찾기
@BP.route('/auth/find_id', methods = ['POST'])
def auth__find_id():
    NAME = request.get_json()['name']
    EMAIL = request.get_json()['email']
    
    #ok# 사용자 이름을 입력하지 않았으면 돌려보낸다
    if NAME == "":
        return jsonify(
            STATUS = "INSERT NAME"
        )
    #ok# 이메일을 입력하지 않았으면 돌려보낸다
    if EMAIL == "":
        return jsonify(
            STATUS = "INSERT EMAIL"
        )

    result = user_find_id(g.db, NAME, EMAIL)
    if result is None:
        result = "NOT FOUND"
    return jsonify(
        RESULT = result
    )

#회원정보반환
@BP.route('/auth/get_userinfo')
@jwt_required
def get_userinfo():
    user = user_select(g.db, get_jwt_identity())
    # LOGOUT 한 상태 or 이상하게 접근한 사람
    if user is None:
        return jsonify(
            "FucKlendar"
        )

    return jsonify(
        result = "success",
        user_id = user['user_id'],
        user_name = user['user_name'],
        user_nick = user['user_nickname'],
        user_photo = user['user_photo'],
        user_email = user['user_email'],
        user_birth = str(user['user_birth']),
        user_gender = user['user_gender']
    )
# 회원탈퇴
@BP.route('/auth/authout', methods = ['POST'])
@jwt_required
def auth__out():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    PW = request.get_json()['pw']

    if check_password_hash(user['user_pw'], PW):
        user_out(g.db, user['user_id'])
        return jsonify(
            STATUS = "SUCCESS"
        )
    else:
        return jsonify(
            STATUS = "Wrong PW"
        )