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
##from flask_mail import Mail, Message
#import time
###########################################
from db_func import *

BP = Blueprint('auth', __name__)

#회원가입
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
    PHOTO = request.form['photo']
    ##### form -> get_json()['변수'] 으로 변경(만약 form으로 안보낸다면)
    ###########################################################

    # 아이디 중복확인 (대소문자 구별 X)
    id_result = user_id_check(g.db, ID)
    if id_result == "exist":
        return jsonify(
            STATUS = "ID EXIST"
        )
    # 오타방지용 비밀번호 두번 입력 후 일치 확인
    if PW != PW2:
        return jsonify(
            STATUS = "PW MATCH FAIL"
        )
    # 이메일 중복확인 (대소문자 구별 X)
    id_result = user_id_check(g.db, ID)
    if email_result == "exist":
        return jsonify(
            STATUS = "EMAIL EXIST"
        )
        
    #디비에 정보 삽입
    user_data = (
        ID, generate_password_hash(PW), EMAIL, NAME, NICK, BIRTH, GENDER, PHOTO
    )
    func_result = user_insert(g.db, user_data)
    
    ## result를 fail로 초기화
    result = "fail"
        
    ## DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"

    ## 결과 전송
    return jsonify(
        STATUS = result
    )


#로그인
@BP.route('/auth/login', methods = ['POST'])
def auth__login():
    ID = request.form['id']
    PW = request.form['pw']
    
    # ID로 DB 접속 후 유저 있는지 확인
    user = user_select(g.db, ID)
    # DB에 ID가 없다면 없다고 출력
    if user is None:
        return jsonify(
            STATUS = "NOT FOUND"
        )
    # DB에 ID가 있다면
    else:
        # 비밀번호 확인 후 로그인 성공 및 토큰 생성
        if check_password_hash(user['user_pw'], PW):
            return jsonify(
                STATUS = "SUCCESS",
                access_token = create_access_token(identity = ID, expires_delta=False)
            )
        # 비밀번호 불일치 시 일치하지 않다고 출력
        else:
            return jsonify(
                STATUS = "INCORRECT PW"
            )
    
#회원정보수정
@BP.route('/auth/modify', methods = ['POST'])
@jwt_required
def auth__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )    
    PW = request.form['pw']
    EMAIL = request.form['email']
    BIRTH = request.form['birth']
    GENDER = request.form['gender']
    PHOTO = request.form['photo']
    
    user_new_data = (
        generate_password_hash(PW), EMAIL, BIRTH, GENDER, PHOTO
    )
    result = user_modify(g.db, user_new_data, user['user_id'])
    return jsonify(
        STATUS = "SUCCESS"
    )

#아이디 찾기
@BP.route('/auth/find_id', methods = ['POST'])
def auth__find_id():
    NAME = request.form['name']
    EMAIL = request.form['email']
    
    result = user_find_id(g.db, NAME, EMAIL)
    if result is None:
        result = "NOT FOUND"
    return jsonify(
        RESULT = result
    )

#비밀번호 찾기
@BP.route('/auth/find_pw', methods = ['POST'])
def auth__find_pw():
    NAME = request.form['name']
    EMAIL = request.form['email']
    ID = request.form['id']

    result = user_find_pw(g.db, NAME, EMAIL, ID)
    return jsonify(
        RESULT = result
    )
############################################################################
################## 수정 필요 #################################################
############################################################################

#회원정보반환
@BP.route('/API/V1/auth/get_userinfo')
@jwt_required
def get_userinfo():
    user = user_select(g.db, get_jwt_identity())
    # LOGOUT 한 상태
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    ##여기서부턴 뭘 계속 히오니한테 전달해줄지 생각


    return jsonify(
        result = "success",
        user_id = user['user_id'],
        user_name = user['user_name'],
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