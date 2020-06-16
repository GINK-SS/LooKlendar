CREATE TABLE IF NOT EXISTS Looklendar_dailylook(
    dailylook_num INT NOT NULL AUTO_INCREMENT,
    dailylook_title VARCHAR(45) NOT NULL,
    dailylook_text VARCHAR(1000),
    dailylook_date DATETIME NOT NULL,
    user_id VARCHAR(20),
    dailylook_outer VARCHAR(45),
    dailylook_top VARCHAR(45) NOT NULL,
    dailylook_bot VARCHAR(45),
    dailylook_shoes VARCHAR(45),
    dailylook_acc VARCHAR(45),
    dailylook_view INT NOT NULL DEFAULT 0,
    dailylook_photo TEXT,
    dailylook_s_photo TEXT,
    FOREIGN KEY(user_id) REFERENCES Looklendar_user(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY(dailylook_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;