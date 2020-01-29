import axios from 'axios';
const initialState = {
   numSongsDataBase: null,
   homeSongSet: [],
   userGeneratedSongSet: [],
   selectedSong: null
}

const GET_NUMFILTEREDSONGS = 'GET_NUMFILTEREDSONGS';
const GET_DEFAULTSONGSET = 'GET_DEFAULTSONGSET';
const GET_WEIGHTSONGSET = 'GET_WEIGHTSONGSET';
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

export function getWeightSongSet(array, weightTotal, numSongs) {
   // since I can't import outside of the src directory, do the code here
   if (array.length < 4) {
      for (let i = 0; i < (4-array.length); i++) {
         array.push([0,0]);
      }
   }
   let pickedLevels = [];
   for (let i = 1; i <= numSongs; i++) {
      let randomNumber = Math.floor(Math.random() * ((weightTotal) - 1 + 1) + 1);
         if (randomNumber <= array[0][1]) {
            pickedLevels.push(array[0][0]);
         } else if (randomNumber <= (array[0][1] + array[1][1])) {
            pickedLevels.push(array[1][0]);
         } else if (randomNumber <= (array[0][1] + array[1][1] + array[2][1])) {
            pickedLevels.push(array[2][0]);
         } else if (randomNumber <= (array[0][1] + array[1][1] + array[2][1] + array[3][1])) {
            pickedLevels.push(array[3][0]);
         } else {
            console.log("You're not supposed to get here.");
            pickedLevels.push(17);
         }
   }
   pickedLevels.sort();
   return {
      type: 'GET_WEIGHTSONGSET',
      // we already determined levels, no need to make another function in controller
      payload: axios.post(`/api/songs/levelsongset`, {pickedLevels})
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
      case(`${GET_WEIGHTSONGSET}_FULFILLED`):
         return {
            ...state,
            userGeneratedSongSet: payload.data
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