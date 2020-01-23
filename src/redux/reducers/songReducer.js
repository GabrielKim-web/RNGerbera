import axios from 'axios';
//we are going to store the songlist (all of those songs) into a global store state here
const initialState = {
   songlist: [],
   numSongs: null,
   favSongs: null
}

const GET_SONGLIST = 'GET_SONGLIST';
const GET_NUMSONGS = 'GET_NUMSONGS';
const GET_FAV_SONG = 'GET_FAV_SONG';
const ADD_SONG = 'ADD_SONG';
const DELETE_SONG = 'DELETE_SONG';
const EDIT_SONG = 'EDIT_SONG;'
const ADD_FAV_SONG = 'ADD_FAV_SONG';

export function getSongList(pageNum) {
   return {
      type: 'GET_SONGLIST',
      payload: axios.get(`/api/songs/get/${pageNum}`)
   }
}

export function getNumSongs() {
   return {
      type: 'GET_NUMSONGS',
      payload: axios.get('/api/songs/')
   }
}
export function addFavSong(user_id, song_id) {
   return {
      type: 'GET_FAV_SONG',
      payload: axios.post(`/api/songs/addFav/`, {user_id, song_id})
   }
}
export function getFavSong() {
   return {
      type: 'GET_SONG',
      payload: axios.get('/api/songs/get/:id')
   }
}
export function addSong(songToBeAdded) {
   return {
      type: 'ADD_SONG',
      payload: axios.post('/api/songs/add', songToBeAdded)
   }
}
export function deleteSong(song_id) {
   return {
      type: 'DELETE_SONG',
      payload: axios.delete(`/api/songs/delete/${song_id}`)
   }
}
export function editSong(songInfo, songToEdit) {
   return {
      type: 'EDIT_SONG',
      payload: axios.put(`/api/songs/edit/${songToEdit}`, songInfo)
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case `${GET_SONGLIST}_FULFILLED`:
         return {
            ...state,
            songlist: payload.data
         }
      case `${GET_NUMSONGS}_FULFILLED`:
         return {
            ...state,
            numSongs: payload.data[0].count
         }
      case `${GET_FAV_SONG}_FULFILLED`:
         return {
            ...state,
            favSongs: payload.data
         }
      case `${ADD_FAV_SONG}_FULFILLED`:
         return {
            ...state,
            favSongs: payload.data
         }
      case `${ADD_SONG}_FULFILLED`:
         return {
            ...state,
            songlist: payload.data
         }
      case `${DELETE_SONG}_FULFILLED`:
         return {
            ...state,
            songlist: payload.data
         }
      case `${EDIT_SONG}_FULFILLED`:
         return {
            ...state,
            songlist: payload.data
         }
      default: return state;
   }
}