import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser, logoutUser} from '../../redux/reducers/userReducer';
import DropdownNav from './DropdownNav';
import '../../stylesheets/Navigation.css';

class Navigation extends Component {
   constructor() {
      super();

      this.state = {
         menuStatus: 'closed'
      }
      this.toggleMenu=this.toggleMenu.bind(this);
   }

   // I'm going to need a componentDidUpdate to see if the user is logged in or not
   componentDidMount() {
      this.props.getUser();
   }

   toggleMenu = () => {
      if (this.state.menuStatus === "closed") {
         this.setState({menuStatus: "opened"});
      } else {
         this.setState({menuStatus: "closed"});
      }
   }

   render() {
      const {user_id, username} = this.props
      return(
         <>
         <div className="container">
            <div className="navbar-brand">
               <Link to={'/'}>RNGerbera</Link>
            </div>
            <ul className="navmenu">
               <div className="usercred">
               {this.props.username ? (
                  <div className="user">
                     <li><Link to={`/user/mypage/${user_id}`}>{username}</Link></li>
                     <li><button className="logout" onClick={() => this.props.logoutUser()}>Logout</button></li>
                  </div>
               ) : (
                  <div className="login">
                     <li><Link to="/user/login">Log in</Link></li>
                     <li><Link to="/user/register">Register</Link></li>
                  </div>
               )}
               </div>
               <div className="persistent">
                  <li><Link to="/songset">Generate</Link></li>
                  <li><Link to="/songlist">Song list</Link></li>
               </div>
            </ul>
            <img onClick={this.toggleMenu} className="hamburger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="oof" />
         </div>
         <DropdownNav 
         username={this.props.username}
         menuStatus={this.state.menuStatus}
         user_id={this.props.user_id}
         toggleMenu={this.toggleMenu}/>
         </>
   )
}
}

const mapStateToProps = reduxState => {
   return {
      // WHAT DID YOU NAME YOUR VARIABLE IN store.js? THAT'S WHY I WAS GETTING ERRORS.
      user_id: reduxState.user.user_id,
      username: reduxState.user.username
   }
}

export default connect(mapStateToProps, {getUser, logoutUser})(Navigation)