import axios from 'axios';
const initialState = {
   numSongsDataBase: null,
   homeSongSet: [],
   userGeneratedSongSet: [],
   selectedSong: null
}

const GET_NUMFILTEREDSONGS = 'GET_NUMFILTEREDSONGS';
const GET_DEFAULTSONGSET = 'GET_DEFAULTSONGSET';
const DELETE_SONGSET = 'DELETE_SONGSET';
const GET_SONGSET = 'GET_SONGSET';

export function getNumFilteredSongs() {
   //this function is for the homeSongSet only; level should determined here
   let level = 17;
   return {
      type: 'GET_NUMFILTEREDSONGS',
      payload: axios.get(`/api/songs/homesongset/${level}`)
   }
}

export function getDefaultSongSet(obj) {
   return {
      type: 'GET_DEFAULTSONGSET',
      payload: axios.post(`/api/songs/defaultsongset`, obj)
   }
}

export function deleteSongSet(songSetId) {
   return {
      type: 'DELETE_SONGSET',
      payload: axios.delete(`/songset/delete/${songSetId}`)
   }
}
//user goes to mypage, their songsets get pulled and displayed via this function
// we definitely need the user's id for this
export function getSongSet(userId) {
   return {
      type: 'GET_SONGSET',
      payload: axios.get(`/songset/get/${userId}`)
   }
}

export default function reducer(state=initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case(`${GET_NUMFILTEREDSONGS}_FULFILLED`):
         return {
            ...state,
            homeSongSet: payload.data
         }
      case(`${GET_DEFAULTSONGSET}_FULFILLED`):
         return {
            ...state,
            userGeneratedSongSet: payload.data
         }
      case(`${DELETE_SONGSET}_FULFILLED`):
      //only user-generated songsets that the user owns can be deleted
         return {
            ...state,
            userGeneratedSongSet: payload.data
         }
      case(`${GET_SONGSET}_FULFILLED`):
         return {
            ...state,
            userGeneratedSongSet: payload.data
         }
      default: return state
   }
}