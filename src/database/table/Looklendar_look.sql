CREATE TABLE IF NOT EXISTS Looklendar_look(
    look_num INT NOT NULL,
    look_photo VARCHAR(100) NOT NULL,
    look_s_photo VARCHAR(102) NOT NULL,
    look_outer VARCHAR(45),
    look_top VARCHAR(45) NOT NULL,
    look_bot VARCHAR(45) NOT NULL,
    look_shoes VARCHAR(45) NOT NULL,
    look_acc VARCHAR(45),
    FOREIGN KEY(look_num) REFERENCES Looklendar_calendar(event_num) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(look_num)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;