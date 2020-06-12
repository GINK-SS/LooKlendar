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
#from flask_mail import Mail, Message
#import time
###########################################
from db_func import *

BP = Blueprint('auth', __name__)

#ok#회원가입
@BP.route('/auth/sign_up', methods = ['POST'])
def auth__sign_up():
    ID = request.get_json()['id']
    PW = request.get_json()['pw']
    PW2 = request.get_json()['pw2']
    EMAIL = request.get_json()['email']
    NAME = request.get_json()['name']
    NICK = request.get_json()['nick']
    BIRTH = request.get_json()['birth']
    GENDER = request.get_json()['gender']
    PHOTO = request.get_json()['photo']
    
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
    ##### ok # 입력하지 않은 것 확인 ###############################
    ######################################################
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

    ##### 글자 수 제한 #######################################
    #######################################################
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
    #####################################################    
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
    #ok# 사진 첨부 안했다면 NULL 입력
    if PHOTO == "":
        PHOTO = None

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
    
#littleok# 회원정보수정 ## file 사진 제외 모두 확인완료
@BP.route('/auth/modify', methods = ['POST'])
@jwt_required
def auth__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )    
    PW = request.get_json()['pw']
    PW2 = request.get_json()['pw2']
    EMAIL = request.get_json()['email']
    BIRTH = request.get_json()['birth']
    GENDER = request.get_json()['gender']
    PHOTO = request.get_json()['photo']
    
    #ok# 오타방지용 비밀번호 두번 입력 후 일치 확인
    if PW != PW2:
        return jsonify(
            STATUS = "PW MATCH FAIL"
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
    #ok# 생년월일을 입력하지 않았다면 NULL 입력
    if BIRTH == "":
        BIRTH = None
    else:
        #ok# 입력했을 시 올바르게 입력했는지 확인
        if birth_check(BIRTH) == "Wrong":
            return jsonify(
                STATUS = "Wrong BIRTH"
            )
    #ok# 사진 첨부 안했다면 NULL 입력
    if PHOTO == "":
        PHOTO = None
    ##ok## 수정할 때 글자 수 제한 ##
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

    user_new_data = (
        generate_password_hash(PW), EMAIL, BIRTH, GENDER, PHOTO, user['user_id']
    )
    result = user_modify(g.db, user_new_data)
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

# #비밀번호 찾기 ## 수정 필요 ##
# @BP.route('/auth/find_pw', methods = ['POST'])
# def auth__find_pw():
#     NAME = request.get_json()['name']
#     EMAIL = request.get_json()['email']
#     ID = request.get_json()['id']

#     result = user_find_pw(g.db, NAME, EMAIL, ID)
#     return jsonify(
#         RESULT = result
#     )
############################################################################
################## 수정 필요 #################################################
############################################################################

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
    ##여기서부턴 뭘 계속 히오니한테 전달해줄지 생각


    return jsonify(
        result = "success",
        user_id = user['user_id'],
        user_name = user['user_name'],
        user_nick = user['user_nickname']
    )

##########################################################################
###### 비밀번호 찾기를 위한 이메일 보내기 이메일 내용으로 비밀번호 변경 ## 수정 필요########
##########################################################################
# app.config['MAIL_SERVER']='smtp.gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USERNAME'] = 'looklendar@gmail.com'
# app.config['MAIL_PASSWORD'] = 'looklook1!'
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True

# @app.route("/email", methods=['post'])
# def email__test(receiver, NEW):

#     senders = 'looklendar@gmail.com'
#     content = '새로운 비밀번호는 %s 입니다. 비밀번호를 변경해주시기 바랍니다.' % NEW
#     #밑에 줄 필요 없을 듯?
#     #receiver = receiver.split(',')   
#     #for i in range(len(receiver)):
#     #    receiver[i] = receiver[i].strip()

#     result = send_email(senders, receiver, content)
        
#     if not result:
#         pw_result = user_pw_modify(g.db, generate_password_hash(NEW), NEW)
#         return jsonify(
#             STATUS = "EMAIL IS SENT",
#             STATUS2 = pw_result
#         )
#     else:
#         return jsonify(
#             STATUS = "EMAIL IS NOT SENT"
#         )
# # 이메일 보내기
# def send_email(senders, receiver, content):
#     try:
#         mail = Mail(app)
#         msg = Message('NEW PASSWORD! - LooKlendar', sender = senders, recipients = receiver)
#         msg.body = content
#         mail.send(msg)
#     except Exception:
#         pass 
#     finally:
#         pass
############################################################################
############################################################################
############################################################################