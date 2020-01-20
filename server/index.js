require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const {registerUser, registerAdmin, loginUser, logoutUser, getCurrentUser} = require('./controllers/usercontroller');
const {getSongList, getSong, getNumSongs, addSong, deleteSong, editSong} = require('./controllers/songcontroller');
const {getNumFilteredSongs, getSpecificSong} = require('./controllers/songsetcontroller');

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, REACT_APP_ADMIN_SECRET} = process.env;

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
// app.get('/user/mypage/:id', getCurrentUser);
app.get('/user', getCurrentUser);

//song endpoints
// app.get('/api/songs/get', getSongList);
app.get('/api/songs/get/:pagenum', getSongList);
app.get('/api/songs/', getNumSongs);
//EXTRA if I decide to implement it; probably will due to editSong
app.get('/api/songs/get/:songToGet', getSong);

//admin controls for song database
app.post('/api/songs/add', addSong);
app.delete('/api/songs/delete/:song_id', deleteSong);
app.put('/api/songs/edit/:songToEdit', editSong);

//songset endpoints
app.get('/api/songs/condition/:level', getNumFilteredSongs)

//MUST MAKE MORE ENDPOINTS FROM songsetReducer
app.get('/api/songs/get/:songToGet', getSpecificSong)



//admin endpoints (user MUST have admin privileges to use these. IMPLEMENT THEM)
// app.post('/api/songs/add', addSong);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));