SELECT COUNT(*) FROM songs WHERE nov_level = $1 OR adv_level = $1 OR exh_level = $1 OR mxm_level = $1;