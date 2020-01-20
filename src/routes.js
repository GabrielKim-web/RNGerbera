import React from 'react'
// import every component we can access from the main page here
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import MyPage from './Components/MyPage/MyPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import SongSet from './Components/SongSet/SongSet';
import SongList from './Components/SongList/SongList';
import RegisterAdmin from './Components/Register/RegisterAdmin';

// We CAN access every single component from the Home page.
export default (
   <Switch>
      <Route exact path="/" component = {Home}/>
      <Route path="/user/mypage/:id" component = {MyPage}/>
      <Route path="/user/login" component = {Login}/>
      <Route path="/user/register" component = {Register}/>
      <Route path="/user/registerAdmin/" component = {RegisterAdmin}/>
      <Route path="/songset" component = {SongSet}/>
      <Route path="/songlist" component = {SongList}/>
      {/* optional component, added in for now. Detailed description of song when user clicks on name. */}
      {/* <Route path="/song/:id" component = {Song}/> */}
   </Switch>
)