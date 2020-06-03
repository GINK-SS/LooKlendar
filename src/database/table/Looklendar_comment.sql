CREATE TABLE IF NOT EXISTS Looklendar_comment(
    comment_num INT NOT NULL AUTO_INCREMENT,
    comment_text VARCHAR(100) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    dailylook_num INT NOT NULL,
    comment_date DATATIME NOT NULL DEFAULT NOW(),
    comment_parent INT DEFAULT NULL,
    FOREIGN KEY(user_id) REFERENCES Looklendar_user(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(dailylook_num) REFERENCES Looklendar_dailylook(dailylook_num) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(comment_parent) REFERENCES Looklendar_comment(comment_num) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(comment_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;