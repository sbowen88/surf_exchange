insert into exchange_users 
( auth_id,profile_picture,first_name, last_name)
values ($1, $2, $3, $4)
returning *;
