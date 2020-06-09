CREATE TABLE IF NOT EXISTS Looklendar_comment(
    comment_num INT NOT NULL AUTO_INCREMENT,
    comment_text VARCHAR(100) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    dailylook_num INT NOT NULL,
    comment_date DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY(comment_num),
    FOREIGN KEY(user_id) REFERENCES Looklendar_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(dailylook_num) REFERENCES Looklendar_dailylook(dailylook_num) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;