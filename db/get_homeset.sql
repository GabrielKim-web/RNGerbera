   SELECT * FROM songs WHERE adv_level = $1 OR exh_level = $1 OR mxm_level = $1 OFFSET floor(random()*$2) LIMIT 1;
