#!/usr/bin/env python3
###########################################
import sys
sys.path.insert(0,'./')
sys.path.insert(0,'./database')
sys.path.insert(0,'./app')
from flask import *
from flask_jwt_extended import *
from flask_cors import CORS
##########################################
from db_init import *
#app.config['MAX_CONTENT_LENGTH'] = 30 * 1024 * 1024
#APPS
import auth, look, event

app = Flask(__name__, instance_relative_config=True)
CORS(app)

#Debug or Release
app.config.update(
		DEBUG = True,
		JWT_SECRET_KEY = "LooKlendar with GINK-SS"
	)
jwt = JWTManager(app)

def main_app(test_config = None):
	### DB 초기화
	init_db()
	app.register_blueprint(auth.BP)
	app.register_blueprint(look.BP)
	app.register_blueprint(event.BP)

### REQUEST 오기 직전
@app.before_request
def before_request():
	get_db()

### REQUEST 끝난 직후
@app.teardown_request
def teardown_request(exception):
	close_db()


@app.route('/'or'/#')
def hello_name():
   return render_template('main.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route("/signup")
def signup():
    return render_template('signup.html')

@app.route("/dailylook")
def dailylook():
    return render_template('dailylook.html')

@app.route("/developer")
def developer():
    return render_template('developer.html')

@app.route("/mypage")
def mypage():
    return render_template('mypage.html')

### 실행
if __name__ == '__main__':
	main_app()
	app.run(host='0.0.0.0', debug=True, port='5000')
