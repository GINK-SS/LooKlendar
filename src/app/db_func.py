from DB_initiat import *
from MySQLdb import *
from bson.objectid import ObjectId
from bson.json_util import loads, dumps

# 아이디 중복확인 (대소문자 구별 X)
def user_id_check(db, user_id):
    with db.cursor() as cursor:
        query = "SELECT user_id FROM Looklendar_user WHERE BINARY user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()

        if result is None:
            return "exist"

# 이메일 중복확인 (대소문자 구별 X)
def user_email_check(db, user_email):
    with db.cursor() as cursor:
        query = "SELECT user_email FROM Looklendar_user WHERE BINARY user_email = %s;"
        cursor.execute(query, (user_email,))
        result = cursor.fetchone()

        if result is None:
            return "exist"

# 유저 정보 저장
def user_insert(db, user_data):
    with db.cursor() as cursor:
        query = "INSERT INTO Looklendar_user(user_id, user_pw, user_email, user_name, user_nickname, user_birth, user_gender, user_photo, user_date) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, CURDATE());"
        cursor.execute(query, (user_data,))
    db.commit()

    return "success"

# 유저 찾기
def user_select(db, user_id):
    with db.cursor() as cursor:
        query = "SELECT * FROM Looklendar_user WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()

    return result

# 아이디 찾기
def user_find_id(db, user_name, user_email):
    with db.cursor() as cursor:
        query = "SELECT user_id FROM Looklendar_user WHERE user_name = %s AND user_email = %s;"
        cursor.execute(query, (user_name, user_email,))
        result = cursor.fetchone()

    return result

# 비밀번호 찾기
def user_find_pw(db, user_name, user_email, user_id):
    with db.cursor() as cursor:
        query = "SELECT user_email FROM Looklendar_user WHERE user_name = %s AND user_email = %s AND user_id = %s;"
        cursor.execute(query, (user_name, user_email, user_id,))
        result = cursor.fetchone()
    if not result:
        return "NOT FOUND"
    else:
        return redirect(url_for('email__test', receiver = user_email, NEW = user_id))

# 비밀번호만 변경
def user_pw_modify(db, new_pw, user_id):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_user SET user_pw = %s WHERE user_id = %s;"
        cursor.execute(query, (new_pw, user_id,))
    db.commit()
    
    return "SUCCESS"

# 유저 정보 변경
def user_modify(db, user_new_data, user_id):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_user SET user_pw = %s, user_email = %s, user_birth = %s, user_gender = %s, user_photo = %s WHERE user_id = %s;"
        cursor.execute(query, (user_new_data, user_id,))
    db.commit()

    return "SUCCESS"

# 데일리 달력에 저장 
def look_insert(db, user_id, look_data):
    with db.cursor() as cursor:
        query = "INSERT INTO Looklendar_look(look_title, look_photo, look_outer, look_top, look_bot, look_shoes, look_acc, look_date, user_id) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s;"
        cursor.execute(query, (look_data, user_id,))
    db.commit()

    return "success"

# 데일리 달력 찾기
def look_select(db, user_id):
    with db.cursor() as cursor:
        query = "SELECT * FROM Looklendar_look WHERE user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()

    return result

# 데일리 달력 변경 
def look_modify(db, look_new_data, look_num):
    with db.cursor() as cursor:
        query = "UPDATE Looklendar_look SET look_title = %s, look_photo = %s, look_outer = %s, look_top = %s, look_bot = %s, look_shoes = %s, look_acc = %s WHERE look_num = %s;"
        cursor.execute(query, (look_new_data, look_num,))
    db.commit()

    return "SUCCESS"

#데일리 달력 삭제 
def look_delete(db, post_id):
	with db.cursor() as cursor:
		query = "DELETE FROM Looklendar_look WHERE look_num = %s;"
		cursor.execute(query, (look_num,))
	db.commit()

	return "success"

#파일 이름 변환 ##수정 필요
def file_name_encode(file_name):
	#허용 확장자 / 길이인지 확인
	if secure_filename(file_name).split('.')[-1].lower() in ALLOWED_EXTENSIONS and len(file_name) < 240:

		#원본 파일!
		path_name = str(datetime.today().strftime("%Y%m%d%H%M%S%f")) + '_' + file_name

		#이미지 리사이즈 파일!
		path_name_S = None

		if secure_filename(file_name).split('.')[-1].lower() in IMG_EXTENSIONS:
			path_name_S = 'S-' + path_name 

		return {"original": path_name, "resize_s": path_name_S}
	
	else:
		return None


#파일 사이즈 측정 ##수정 필요
def files_size_check(files):
	files_size = 0
	for file in files:
		files_size += len(file.read())
	#총 파일 크기 50MB 제한 
	if files_size < (50 * (1024 ** 2)):
		return True
	else:
		return False
