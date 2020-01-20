import axios from 'axios';
const initialState = {
   songSetLength: 3,
   numSongsDataBase: null,
   homeSongSet: [],
   userGeneratedSongSet: [],
   selectedSong: null
}

const GET_NUMFILTEREDSONGS = 'GET_NUMFILTEREDSONGS';
const GET_SPECIFICSONG = 'GET_SPECIFICSONG';
const ADD_SONGSET = 'ADD_SONGSET';
const DELETE_SONGSET = 'DELETE_SONGSET';
const GET_SONGSET = 'GET_SONGSET';

export function getNumFilteredSongs(obj) {
   //this function will be used to pull eligible songs for that one song being pulled
   //parameters go here; this is just a sample for now
   //we will determine what level to pull here given a range
   let level = 17;
   return {
      type: 'GET_NUMFILTEREDSONGS',
      // even if we want to just get, we can ALWAYS pass an object in req.body
      payload: axios.get(`/api/songs/condition/${level}`, obj.numSongs)
   }
}

export function getSpecificSong() {
   //this function will be called multiple times depending on how many songs are in the list
   //an ID should already be determined before they get here (pull it from database)
   //a sample is determined for now; id should be passed via argument later
   let songToGet = 538
   return {
      type: 'GET_SPECIFICSONG',
      payload: axios.get(`/api/songs/get/${songToGet}`)
   }
}

export function addSongSet(songSet) {
   //this function will add one new songSet to the database and assign it an owner value
   //EXTRA: Add button to Home Songset that if the user wants to grab that daily songset, add it to his/her own!
   //songSet will be created on the client side and sent here to add it to the database
   return {
      type: 'ADD_SONGSET',
      payload: axios.post(`/songset/add`, songSet)
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
      case(`${GET_SPECIFICSONG}_FULFILLED`):
      //this is returned, pushed to a songset, then repeated 3-7 times
         return {
            ...state,
            selectedSong: payload.data
         }
      case(`${ADD_SONGSET}_FULFILLED`):
      //the songset added is returned to a database
         return {
            ...state,
            homeSongSet: payload.data
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