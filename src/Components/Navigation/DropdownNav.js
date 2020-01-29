import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/Navigation.css';

class DropdownNav extends Component {
   render() {
      const {username, user_id, toggleMenu} = this.props;
      return(
         <div className={`DropdownNav ${this.props.menuStatus}`}>
            <ul className="mobilenav">
            <div className="usercred">
               {this.props.username ? (
                  <div className="user">
                     <li onClick={toggleMenu}><Link to={`/user/mypage/${user_id}`}>{username}</Link></li>
                     <li onClick={toggleMenu}><button className="logout" onClick={() => this.props.logoutUser()}>Logout</button></li>
                  </div>
               ) : (
                  <div className="login">
                     <li onClick={toggleMenu}><Link to="/user/login">Log in</Link></li>
                     <li onClick={toggleMenu}><Link to="/user/register">Register</Link></li>
                  </div>
               )}
               </div>
               <div className="persistent">
                  <li onClick={toggleMenu}><Link to="/songset">Generate</Link></li>
                  <li onClick={toggleMenu}><Link to="/songlist">Song list</Link></li>
               </div>
            </ul>
         </div>
      )
   }
}

export default DropdownNav;