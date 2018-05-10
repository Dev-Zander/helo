SELECT *
FROM helo_users
WHERE id != $1 and id
NOT IN (SELECT helo_friend_id
		FROM helo_friends
		WHERE user_id = $1)



