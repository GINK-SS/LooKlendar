CREATE TABLE IF NOT EXISTS Looklendar_dailylook(
    dailylook_num INT NOT NULL AUTO_INCREMENT,
    dailylook_title VARCHAR(45) NOT NULL,
    dailylook_text TEXT NOT NULL,
    dailylook_date DATETIME NOT NULL DEFAULT NOW(),
    dailylook_outer VARCHAR(45),
    dailylook_top VARCHAR(45) NOT NULL,
    dailylook_bot VARCHAR(45) NOT NULL,
    dailylook_shoes VARCHAR(45) NOT NULL,
    dailylook_acc VARCHAR(45),
    dailylook_view INT NOT NULL DEFAULT 0,
    dailylook_photo VARCHAR(100),
    user_id VARCHAR(20) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Looklendar_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(dailylook_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;