SELECT users.username, songs.jacket FROM songstats
-- users is wherever the primary key is referenced from
INNER JOIN users ON users.user_id = songstats.user_id
INNER JOIN songs ON songs.id = songstats.song_id
WHERE users.user_id = $1;