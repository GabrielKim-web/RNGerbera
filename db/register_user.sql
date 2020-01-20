INSERT INTO users (username, password, is_admin, email)
VALUES ($1, $2, false, $3);
-- SELECT * FROM users ORDER BY user_id ASC LIMIT 1;
SELECT MAX(user_id) FROM users;