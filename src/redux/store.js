import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
// all of the reducer functions exported by default from the reducer.js files
import userReducer from './reducers/userReducer';
import songReducer from './reducers/songReducer';
import songsetReducer from './reducers/songsetReducer';

const rootReducer = combineReducers({
   user: userReducer,
   song: songReducer,
   songset: songsetReducer
})

export default createStore(rootReducer, applyMiddleware(promise));