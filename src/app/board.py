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

BP = Blueprint('board', __name__)

UPLOAD_PATH = "/static/files/"

# 커뮤니티 전체글 반환
@BP.route('/board/main', methods=['POST'])
def board__look():
    PAGE = request.get_json()['page']
    result = {}
    boards = boards_select(g.db, int(PAGE))
    if get_jwt_identity():
        user = user_select(g.db, get_jwt_identity())
        if user is None:
            return jsonify(
                "FucKlendar"
            )
    
    result.update(
        STATUS = "SUCCESS",
        BOARD = boards
    )
    return jsonify(result)

# 커뮤니티 검색 글 반환
@BP.route('/board/search', methods=['POST'])
def board__look_search():
    PAGE = request.get_json()['page']
    TEXT = request.get_json()['text']
    OPTION = request.get_json()['option']
    result = {}
    boards = boards_select_search(g.db, TEXT, (int(PAGE)*12-12), OPTION)

    if get_jwt_identity():
        user = user_select(g.db, get_jwt_identity())
        if user is None:
            return jsonify(
                "FucKlendar"
            )
    
    result.update(
        STATUS = "SUCCESS",
        BOARD = boards
    )
    return jsonify(result)

# 커뮤니티 정렬 글 반환
@BP.route('/board/array', methods=['POST'])
def board__look_array():
    PAGE = request.get_json()['page']
    OPTION = request.get_json()['option']
    result = {}
    boards = boards_select_array(g.db, int(PAGE), OPTION)

    if get_jwt_identity():
        user = user_select(g.db, get_jwt_identity())
        if user is None:
            return jsonify(
                "FucKlendar"
            )
    
    result.update(
        STATUS = "SUCCESS",
        BOARD = boards
    )
    return jsonify(result)
    
# 커뮤니티 단일 글 + 글의 댓글 반환
@BP.route('/board/<int:dailylook_num>')
def board__look_one(dailylook_num):
    result = {}
    board = board_select(g.db, dailylook_num)
    comment = comment_select(g.db, dailylook_num)
    result.update(
        STATUS = "SUCCESS",
        BOARD = board,
        COMMENT = comment
    )
    return jsonify(result)

# 커뮤니티 글 올리기
@BP.route('/board/upload', methods = ['POST'])
@jwt_required
def board__upload():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )

    TITLE = request.form['title']
    TEXT = request.form['text']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    try:
        files = request.files['file']
    except:
        files = None
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
        board_data = (
            TITLE, TEXT, user['user_id'], OUTER, TOP, BOT, SHOES, ACC, PHOTO
        )
        func_result = board_insert(g.db, board_data)
        if func_result == "success":
            # 사진 저장
            if PHOTO != "look_default.png":
                files.save('.' + UPLOAD_PATH + file_check['original'])
        else:
            return jsonify(
                STATUS = "Can't Insert PHOTO DB"
            )
    # 사진 등록 안 했다면
    else:
        PHOTO = "look_default.png"
        board_data = (
            TITLE, TEXT, user['user_id'], OUTER, TOP, BOT, SHOES, ACC, PHOTO
        )
        func_result = board_insert(g.db, board_data)
    ## result를 fail로 초기화
    result = "fail"
        
    ## DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"

    ## 결과 전송
    return jsonify(
        STATUS = result
    )

# 커뮤니티 글 수정
@BP.route('/board/modify', methods = ['POST'])
@jwt_required
def board__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    NUM = request.form['num']
    # 글의 주인인지 확인
    APPLY = board_apply(g.db, NUM, user['user_id'])
    # 만약 아니면 허락되지 않았음
    if APPLY == "FUCK":
        return jsonify(
            STATUS = "not allowed"
        )
    TITLE = request.form['title']
    TEXT = request.form['text']
    OUTER = request.form['outer']
    TOP = request.form['top']
    BOT = request.form['bot']
    SHOES = request.form['shoes']
    ACC = request.form['acc']
    try:
        files = request.files['file']
    except:
        files = None
    REMOVE = request.form['remove']
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
        board_new_data = (
            TITLE, TEXT, OUTER, TOP, BOT, SHOES, ACC, PHOTO, NUM
        )
        func_result = board_modify(g.db, board_new_data)
        if func_result == "success":
            # 사진 저장
            files.save('.' + UPLOAD_PATH + file_check['original'])
        else:
            return jsonify(
                STATUS = "Can't Insert PHOTO DB"
            )
    else:
        if REMOVE == "1":
            PHOTO = "look_default.png"
            board_new_data = (
                TITLE, TEXT, OUTER, TOP, BOT, SHOES, ACC, PHOTO, NUM
            )
            func_result = board_modify(g.db, board_new_data)
        else:
            # 사진 그대로 유지
            board_new_data = (
                TITLE, TEXT, OUTER, TOP, BOT, SHOES, ACC, NUM
            )
            func_result = board_modify2(g.db, board_new_data)
    ## result를 fail로 초기화
    result = "fail"
        
    ## DB에 삽입 성공
    if func_result == "success":
        result = "SUCCESS"

    ## 결과 전송
    return jsonify(
        STATUS = result
    )

# 커뮤니티 글 삭제
@BP.route('/board/delete', methods = ['POST'])
@jwt_required
def board__delete():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    NUM = request.get_json()['num']
    #글의 주인인지 확인 (관리자면 OK)
    if user['user_id'] == "admin":
        APPLY = "OK"
    else:
        APPLY = board_apply(g.db, NUM, user['user_id'])
    # 아니면 권한없음
    if APPLY == "FUCK":
        return jsonify(
            STATUS = "Not allowed"
        )
    result = board_delete(g.db, NUM)

    return jsonify(
        STATUS = result
    )

# 좋아요 누르기
@BP.route('/board/like/<int:dailylook_num>')
@jwt_required
def board__like_up(dailylook_num):
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    result = board_like_upNdown(g.db, dailylook_num, user['user_id'])

    return jsonify(
        SUCCESS = result
    )

# 조회수 증가
@BP.route('/board/view/<int:dailylook_num>')
def board__view(dailylook_num):
    result = board_view(g.db, dailylook_num)

    return jsonify(
        SUCCESS = result
    )

# 댓글 작성
@BP.route('/comment/upload', methods=['POST'])
@jwt_required
def comment__upload():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    TEXT = request.get_json()['text']
    DAILY_NUM = request.get_json()['daily_num']
    
    comment_data = (
        TEXT, user['user_id'], DAILY_NUM
    )
    result = comment_upload(g.db, comment_data)

    return jsonify(
        STATUS = result
    )

# 댓글 수정
@BP.route('/comment/modify', methods=['POST'])
@jwt_required
def comment__modify():
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    NUM = request.get_json()['num']
    access = comment_apply(g.db, NUM, user['user_id'])
    if access != "OK":
        return jsonify(
            STATUS = "Not allowed"
        )
    # 작성자 본인이라면
    else:
        TEXT = request.get_json()['text']
        result = comment_modify(g.db, NUM, TEXT)

        return jsonify(
            STATUS = result
        )

# 댓글 삭제
@BP.route('/comment/delete/<int:comment_num>')
@jwt_required
def comment__delete(comment_num):
    user = user_select(g.db, get_jwt_identity())
    if user is None:
        return jsonify(
            "FucKlendar"
        )
    # 관리자라면 엑세스 통과
    if user['user_id'] == 'admin':
        access = "OK"
    # 관리자가 아닐 경우 댓글의 작성자인지 확인
    else:
        access = comment_apply(g.db, comment_num, user['user_id'])
    # 작성자가 아니라면 삭제 불가
    if access != "OK":
        return jsonify(
            STATUS = "Not allowed"
        )
    else:
        result = comment_delete(g.db, comment_num)

        return jsonify(
            STATUS = result
        )