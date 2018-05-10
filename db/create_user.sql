INSERT INTO helo_users(user_name, auth_id, photo)
VALUES ($1,$2,$3)
RETURNING *;