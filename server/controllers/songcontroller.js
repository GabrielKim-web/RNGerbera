const getSongList = async (req, res) => {
   const db = req.app.get('db');
   let searchHere = req.params.pagenum;
   let offset = (searchHere-1)*50;
   const songlist = await db.get_songlist(offset);
   res.status(200).json(songlist);
}

const getNumSongs = async (req, res) => {
   const db = req.app.get('db');
   const numSongs = await db.check_num_songs();
   res.status(200).json(numSongs);
}

const getFavSong = async (req, res) => {

}
const addSong = async (req, res) => {
   const db = req.app.get('db');
   const {songid, name, artist, nov, novlink, adv, advlink, exh, exhlink, mxm, mxmlink, videoPlay, noFx, jacket} = req.body;
   console.log(req.body);
   const songAdded = await db.add_song(songid, name, artist, nov, novlink, adv, advlink, exh, exhlink, mxm, mxmlink, videoPlay, noFx, jacket)
   res.status(200).json(songAdded);
}
const deleteSong = async (req, res) => {
   const db = req.app.get('db');
   const {song_id} = req.params;
   const songDeleted = await db.remove_song(song_id);
   res.status(200).json(songDeleted);
}
const editSong = async (req, res) => {
   const db = req.app.get('db');
   const {songToEdit} = req.params;
   const {song_id, title, title_translated, title_romanized, artist, nov_level, nov_link, adv_level, adv_link, exh_level, exh_link, mxm_level, mxm_link, video_play, video_nofx, video_og, jacket} = req.body;
   const songEdited = await db.edit_song(song_id, title, title_translated, title_romanized, artist, nov_level, nov_link, adv_level, adv_link, exh_level, exh_link, mxm_level, mxm_link, video_play, video_nofx, video_og, jacket, songToEdit)
   res.status(200).json(songEdited);
}
const addFavSong = async (req, res) => {
   const db = req.app.get('db');
   const {user_id, song_id} = req.body;
   const favSongAdded = await db.add_fav_song(user_id, song_id);
   res.status(200).json(favSongAdded);
}

module.exports = {
   getSongList,
   getNumSongs,
   getFavSong,
   addSong,
   deleteSong,
   editSong,
   addFavSong
}