from pymysql import *
import sys
import re
from datetime import datetime
from werkzeug.utils import secure_filename
from pprint import pprint
#from PIL import Image

UPLOAD_PATH = "/static/files/"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
IMG_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}

#ok# 공백 확인
def isBlank(text):
    encText = text

    blankCount = re.findall(' ', encText)

    return blankCount
#ok# 한글 확인 (한글 있으면 들어있는 리스트, 없으면 빈 리스트)
def isHangul(text):
    encText = text
    
    hanCount = re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', encText)

    return hanCount

#ok# 기타 특수문자 확인 (특수문자 있으면 들어있는 리스트, 없으면 빈 리스트)
def isSpecial(text):
    encText = text

    SpeCount = re.findall(u'[^\w\s]', encText)

    return SpeCount

#ok# (이메일만) 기타 특수문자 확인 (이메일 중 앞에 아이디 부분만 추출하기 위하여)
def is_emailSpecial(text):
    encText = text
    pattern = '(@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)'
    text = re.sub(pattern=pattern, repl='', string=text)
    SpeCount = re.findall(u'[^\w\s]', text)

    return SpeCount
#ok# 한글 자음, 모음 확인 (온전한 한글이 아닌 것 확인)
def isHangulzmo(text):
    encText = text
    zmoCount = re.findall(u'[\u3131-\u3163]+', encText)
    
    return zmoCount

#ok# 이메일 형식인지 확인
def is_emailFormat(text):
    p = re.compile('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    encText = text
    EF = p.match(encText)

    return EF

#ok# 아이디 중복확인 (대소문자 구별 X)
def user_id_check(db, user_id):
    with db.cursor() as cursor:
        query = "SELECT user_id FROM Looklendar_user WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
    if result:
        return "exist"

#ok# 닉네임 중복확인 (대소문자 구별 X)
def user_nick_check(db, user_nickname):
    with db.cursor() as cursor:
        query = "SELECT user_nickname FROM Looklendar_user WHERE user_nickname = %s;"
        cursor.execute(query, (user_nickname,))
        result = cursor.fetchone()
    if result:
        return "exist"

#ok# 이메일 중복확인 (대소문자 구별 X)
def user_email_check(db, user_email):
    with db.cursor() as cursor:
        query = "SELECT user_email FROM Looklendar_user WHERE user_email = %s;"
        cursor.execute(query, (user_email,))
        result = cursor.fetchone()
    if result:
        return "exist"

# 닉네임 수정 시 중복확인 (대소문자 구별 X)
def user_nick_check2(db, user_nickname, user_id):
    with db.cursor() as cursor:
        query = "SELECT user_nickname FROM Looklendar_user WHERE user_nickname = %s AND user_id <> %s;"
        cursor.execute(query, (user_nickname, user_id,))
        result = cursor.fetchone()
    if result:
        return "exist"

#ok# 이메일 수정 시 중복확인 (대소문자 구별 X, 본인 원래 이메일은 제외)
def user_email_check2(db, user_email, user_id):
    with db.cursor() as cursor:
        query = "SELECT user_email FROM Looklendar_user WHERE user_email = %s AND user_id <> %s;"
        cursor.execute(query, (user_email, user_id,))
        result = cursor.fetchone()
    if result:
        return "exist"        

#ok# 생일 오류 확인 (1900년 이전이거나 오늘날짜보다 미래날짜를 입력했을 경우 및 생일 포맷인지를 확인)
def birth_check(BIRTH):
    system_date_format = '%Y%m%d'

    try:
        birthday = datetime.strptime(BIRTH, system_date_format)
    except ValueError:
        return "Wrong"
    
    if datetime.now() < birthday:
        return "Wrong"
    birthTuple = birthday.timetuple()
    if birthTuple.tm_year < 1900:
        return "Wrong"
        
#ok# 유저 정보 저장
def user_insert(db, user_data):
    with db.cursor() as cursor:
        query = "INSERT INTO Looklendar_user(user_id, user_pw, user_email, user_name, user_nickname, user_birth, user_gender, user_photo, user_date) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, NOW());"
        cursor.execute(query, user_data)
    db.commit()

    return "success"

#ok# 유저 정보 반환
def user_select(db, user_id):
    with db.cursor() as cursor:
        query = "SELECT * FROM Looklendar_user WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()

        if result is None:
            return "NOT FOUND"
    return result

#ok# 아이디 찾기
def user_find_id(db, user_name, user_email):
    with db.cursor() as cursor:
        query = "SELECT user_id FROM Looklendar_user WHERE user_name = %s AND user_email = %s;"
        cursor.execute(query, (user_name, user_email,))
        result = cursor.fetchone()

    return result

# # 비밀번호 찾기
# def user_find_pw(db, user_name, user_email, user_id):
#     with db.cursor() as cursor:
#         query = "SELECT user_email FROM Looklendar_user WHERE user_name = %s AND user_email = %s AND user_id = %s;"
#         cursor.execute(query, (user_name, user_email, user_id,))
#         result = cursor.fetchone()
#     if result is None:
#         return "NOT FOUND"
#     else:
#         return redirect(url_for('email__test', receiver = user_email, NEW = user_id))

# 비밀번호만 변경 # 아직 구현 안할거임
def user_pw_modify(db, new_pw, user_id):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_user SET user_pw = %s WHERE user_id = %s;"
        cursor.execute(query, (new_pw, user_id,))
    db.commit()

    return "SUCCESS"

#ok# 유저 정보 변경
def user_modify(db, user_new_data):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_user SET user_email = %s, user_nickname = %s, user_birth = %s, user_gender = %s, user_photo = %s WHERE user_id = %s;"
        cursor.execute(query, user_new_data)
    db.commit()

    return "SUCCESS"

# 유저 정보 삭제 (회원탈퇴)
def user_out(db, user_id):
    with db.cursor() as cursor:
        query = "DELETE FROM Looklendar_user WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
    db.commit()

    return "SUCCESS"

#ok# 데일리 달력에 저장 
def look_insert(db, look_data, look_data2):
    with db.cursor() as cursor:
        query = "INSERT INTO Looklendar_calendar(event_title, event_color, user_id, event_date, event_place) VALUES(%s, %s, %s, %s, %s);"
        cursor.execute(query, look_data)
        db.commit()
        query = "INSERT INTO Looklendar_look(look_num, look_photo, look_s_photo, look_outer, look_top, look_bot, look_shoes, look_acc) VALUES((SELECT event_num FROM Looklendar_calendar WHERE user_id = %s AND event_date = %s), %s, %s, %s, %s, %s, %s, %s);"
        cursor.execute(query, look_data2)
    db.commit()

    return "success"

#ok# 데일리 달력 찾기
def look_select(db, user_id):
    with db.cursor() as cursor:
        query = "SELECT event_num, event_title, event_color, user_id, CONCAT(year(event_date), '-', IF(LENGTH(month(event_date))<>2, CONCAT('0', month(event_date)), month(event_date)), '-', IF(LENGTH(day(event_date))<>2, CONCAT('0', day(event_date)), day(event_date))) AS event_date, event_place, look_photo, look_s_photo, look_outer, look_top, look_bot, look_shoes, look_acc FROM v_Looklendar_look WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()
        pprint(result)
    return result

#ok# 데일리 달력 변경 
def look_modify(db, look_new_data, look_new_data2):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_calendar SET event_title = %s, event_color = %s, event_date = %s, event_place = %s WHERE event_num = %s;"
        cursor.execute(query, look_new_data)
        query = "UPDATE Looklendar_look SET look_photo = %s, look_s_photo = %s, look_outer = %s, look_top = %s, look_bot = %s, look_shoes = %s, look_acc = %s WHERE look_num = %s;"
        cursor.execute(query, look_new_data2)
    db.commit()

    return "SUCCESS"

#ok# 데일리 달력 삭제 
def look_delete(db, event_num):
    with db.cursor() as cursor:
        query = "DELETE FROM Looklendar_calendar WHERE event_num = %s;"
        cursor.execute(query, (event_num,))
    db.commit()

    return "success"

#ok# 일정 달력 찾기
def event_select(db, user_id):
    with db.cursor() as cursor:
        # 희원이한테 날짜를 문자열로 줘야하는데 아니면은 이상하게 나와서 처음엔 간단한 %Y 이런식으로 했는데 이게 파이썬에서 뭘 받는 걸로 인식을 해서 년도, 월, 일 따로 받았는데 따로 떨어져 있어서 CONCAT으로 묶었지만 한자리면은 한자리 수만 나와서 그 앞에 IF문을 사용해서 한자리면 앞에 0을 붙이게 출력하도록 함
        query = "SELECT event_num, event_title, event_color, user_id, CONCAT(year(event_date), '-', IF(LENGTH(month(event_date))<>2, CONCAT('0', month(event_date)), month(event_date)), '-', IF(LENGTH(day(event_date))<>2, CONCAT('0', day(event_date)), day(event_date))) AS event_date, event_place FROM Looklendar_calendar WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()

    return result

#ok# 일정 달력에 저장 
def event_insert(db, event_data):
    with db.cursor() as cursor:
        query = "INSERT INTO Looklendar_calendar(event_title, event_color, event_date, event_place, user_id) VALUES(%s, %s, %s, %s, %s);"
        cursor.execute(query, event_data)
    db.commit()

    return "success"

#ok# 일정 달력 변경 
def event_modify(db, event_new_data):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_calendar SET event_title = %s, event_date = %s, event_color = %s, event_place = %s WHERE event_num = %s;"
        cursor.execute(query, event_new_data)
    db.commit()

    return "SUCCESS"

#ok# 일정 달력 삭제 
def event_delete(db, event_num):
    with db.cursor() as cursor:
        query = "DELETE FROM Looklendar_calendar WHERE event_num = %s;"
        cursor.execute(query, (event_num,))
    db.commit()

    return "success"

# 파일 이름/경로 생성 및 확장자/길이 확인(이미지만! 원본 + 미리보기) 
def file_name_encode(file_name):
    # 허용 확장자 / 길이인지 확인
    if secure_filename(file_name).split('.')[-1].lower() in IMG_EXTENSIONS and len(file_name) < 240:

        #원본 파일
        path_name = str(datetime.today().strftime("%Y%m%d%H%M%S%f")) + '_' + file_name
        if file_name == "user_image1.jpg":
            path_name = "user_image1.jpg"
        if file_name == "look_default.png":
            path_name = "look_default.png"
        # 미리보기 파일
        s_path_name = 'S-' + path_name

        return {"original": path_name, "resize": s_path_name}

    else:
        return None

#파일 사이즈 측정 ##수정 필요
def files_size_check(Files):
    files_size = 0
    files_size += len(Files.read())
    #총 파일 크기 50MB 제한 
    if files_size < (30 * (1024 ** 2)):
        return True
    else:
        return False
