#!/usr/bin/env python3
###########################################
import sys
sys.path.insert(0,'./')
sys.path.insert(0,'./database')
sys.path.insert(0,'./apps')
from flask import *
from flask_jwt_extended import *
from flask_cors import CORS
##########################################
from db_init import *

#APPS
import auth

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
	application.register_blueprint(auth.BP)

### REQUEST 오기 직전
@app.before_request
def before_request():
	get_db()

### REQUEST 끝난 직후
@app.teardown_request
def teardown_request(exception):
	close_db()

### 실행
if __name__ == '__main__':
	main_app()
	app.run(host='0.0.0.0', debug=True, port='5000')
