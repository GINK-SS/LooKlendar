CREATE TABLE IF NOT EXISTS Looklendar_dailylook(
    dailylook_num INT NOT NULL AUTO_INCREMENT,
    dailylook_title VARCHAR(45) NOT NULL,
    dailylook_text VARCHAR(200),
    dailylook_date VARCHAR(45) NOT NULL,
    look_num INT NOT NULL,
    dailylook_like INT NOT NULL,
    dailylook_view INT NOT NULL,
    FOREIGN KEY(look_num) REFERENCES Looklendar_look(look_num) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(dailylook_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;