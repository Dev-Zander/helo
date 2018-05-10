SELECT helo_users.id, helo_users.first_name, helo_users.last_name, helo_users.photo,helo_friends.user_id, helo_friends.helo_friend_id
FROM helo_users
FULL JOIN helo_friends ON helo_users.id = helo_friends.id
WHERE helo_users.id != $1