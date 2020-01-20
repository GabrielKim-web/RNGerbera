import axios from 'axios';
//note that password is not here; why would the user want their password stored as a cookie?
const initialState = {
   user_id: null,
   username: null,
   email: null
}

//action types
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';

//we create these action types here (payload)
export function getUser() {
   return {
      type: GET_USER,
      // 1/13 16:13: need to get the id; probably from user's session
      // payload: axios.get('/user/mypage/:id')
      payload: axios.get('/user')
   }
}

export function logoutUser() {
   return {
      type: LOGOUT_USER,
      payload: axios.post('/user/logout')
   }
}

export function registerUser(username, password, email) {
   let user = {username, password, email}
   return {
      type: REGISTER_USER,
      payload: axios.post('/user/register', user)
   }
}

export function loginUser(usernameOrEmail, password) {
   let user = {usernameOrEmail, password};
   return {
      type: LOGIN_USER,
      payload: axios.post('/user/login', user)
   }
}

export default function reducer(state = initialState, action) {
   //action.payload refers to what is being received due to the store function 
   //(check return {payload: axios.something})
   const {type, payload} = action;
   switch(type) {
      case `${LOGIN_USER}_FULFILLED`:
         return {
            ...state,
            user_id: payload.data.user_id,
            username: payload.data.username,
            // is_Admin: payload.data.is_Admin
         }
      case `${LOGOUT_USER}_FULFILLED`:
         return {
            ...state,
            user_id: null,
            username: '',
            is_Admin: false
         }
      case `${REGISTER_USER}_FULFILLED`:
         alert("Account successfully created. Please log in.");
         return {
            ...state,
            user_id: payload.data.user_id,
            username: payload.data.username,
            // is_Admin: payload.data.is_Admin 
         }
      case `${GET_USER}_FULFILLED`:
         return {
            ...state,
            user_id: payload.data.user_id,
            username: payload.data.username,
            // 11/13 19:54: You kinda don't want this to be on the client side.
            // is_Admin: payload.data.is_Admin
         }
      default: return state;
   }
}