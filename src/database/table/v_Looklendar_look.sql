CREATE OR REPLACE VIEW v_Looklendar_look 
    AS 
    SELECT cal.event_num, cal.event_title, cal.event_color, cal.user_id, cal.event_date, cal.event_place, lo.look_photo, lo.look_s_photo, lo.look_outer, lo.look_top, lo.look_bot, lo.look_shoes, lo.look_acc 
    FROM Looklendar_calendar AS cal 
    JOIN Looklendar_look AS lo 
    ON cal.event_num = lo.look_num;