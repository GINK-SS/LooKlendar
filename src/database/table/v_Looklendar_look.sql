CREATE OR REPLACE VIEW v_Looklendar_look 
    AS 
    SELECT cal.event_num, cal.event_title, cal.event_color, cal.user_id, CONCAT(year(cal.event_date), '-', IF(LENGTH(month(cal.event_date))<>2, CONCAT('0', month(cal.event_date)), month(cal.event_date)), '-', IF(LENGTH(day(cal.event_date))<>2, CONCAT('0', day(cal.event_date)), day(cal.event_date))) AS event_date, cal.event_place, lo.look_photo, lo.look_s_photo, lo.look_outer, lo.look_top, lo.look_bot, lo.look_shoes, lo.look_acc 
    FROM Looklendar_calendar AS cal 
    JOIN Looklendar_look AS lo 
    ON cal.event_num = lo.look_num;