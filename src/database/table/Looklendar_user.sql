CREATE TABLE IF NOT EXISTS Looklendar_user(
    user_id VARCHAR(20) NOT NULL,
    user_pw VARCHAR(100) NOT NULL,
    user_email VARCHAR(30) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_nickname VARCHAR(20) NOT NULL,
    user_birth DATETIME DEFAULT '1900-01-01',
    user_gender TINYINT DEFAULT 1,
    user_date DATETIME NOT NULL,
    user_photo TEXT,
    PRIMARY KEY(user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;