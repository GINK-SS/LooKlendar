CREATE OR REPLACE VIEW v_Looklendar_user
    AS 
    SELECT user_id, user_email, user_name, user_nickname, user_birth, user_gender, user_date, user_photo
    FROM Looklendar_user;