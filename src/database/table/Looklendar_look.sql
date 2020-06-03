CREATE TABLE IF NOT EXISTS Looklendar_look(
    look_num INT NOT NULL AUTO_INCREMENT,
    look_title VARCHAR(45) NOT NULL,
    look_photo TEXT,
    look_outer VARCHAR(45),
    look_top VARCHAR(45) NOT NULL,
    look_bot VARCHAR(45),
    look_shoes VARCHAR(45),
    look_acc VARCHAR(45),
    user_id VARCHAR(20) NOT NULL,
    look_date DATETIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Looklendar_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(look_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;