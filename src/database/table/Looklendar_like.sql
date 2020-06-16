CREATE TABLE IF NOT EXISTS Looklendar_like(
    dailylook_num INT NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Looklendar_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(dailylook_num) REFERENCES Looklendar_dailylook(dailylook_num) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(user_id, dailylook_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;