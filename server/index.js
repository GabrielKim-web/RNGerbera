require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const {registerUser, registerAdmin, loginUser, logoutUser, getCurrentUser, getUser, getUserName} = require('./controllers/usercontroller');
const {getSongList, getFavSong, getNumSongs, addSong, deleteSong, editSong, addFavSong} = require('./controllers/songcontroller');
const {getNumFilteredSongs, getDefaultSongSet, getLevelSongSet} = require('./controllers/songsetcontroller');

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

app.use(express.json());
app.use(session({
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      //one week
      maxAge: 1000 * 60 * 60 * 24 * 7
   }
}))

massive(CONNECTION_STRING).then(db => {
   app.set('db', db);
   console.log('Connected to database');
})

//user endpoints
app.post('/user/login', loginUser);
app.post('/user/logout', logoutUser);
app.post('/user/register', registerUser);
app.post(`/user/registeradmin`, registerAdmin);
app.get('/user', getCurrentUser);
app.get('/user/songs/:user_id', getUser);
app.get('/user/:user_id', getUserName);

//song endpoints
app.get('/api/songs/get/:pagenum', getSongList);
app.get('/api/songs/', getNumSongs);
app.post('/api/songs/addFav/', addFavSong);
app.get('/api/songs/getFav/', getFavSong);

//admin controls for song database
app.post('/api/songs/add', addSong);
app.delete('/api/songs/delete/:song_id', deleteSong);
app.put('/api/songs/edit/:songToEdit', editSong);

//home songset endpoints
app.get('/api/songs/homesongset/:level', getNumFilteredSongs);

//user songset endpoints
app.post('/api/songs/defaultsongset', getDefaultSongSet);
app.post('/api/songs/levelsongset', getLevelSongSet);

//admin endpoints (user MUST have admin privileges to use these. IMPLEMENT THEM)
// app.post('/api/songs/add', addSong);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));