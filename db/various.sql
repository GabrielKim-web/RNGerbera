--various SQL queries I used go here
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (20),
  password text,
  is_admin boolean,
  email VARCHAR (50)
);

--turns int of id into serial key
SELECT MAX(id)+1 FROM songs;
CREATE SEQUENCE test_id_seq MINVALUE 1;
ALTER TABLE songs ALTER id SET DEFAULT nextval('test_id_seq');
ALTER SEQUENCE test_id_seq OWNED BY songs.id;