import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser, logoutUser} from '../../redux/reducers/userReducer';
// import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import '../../stylesheets/Navigation.css';

class Navigation extends Component {

   // I'm going to need a componentDidUpdate to see if the user is logged in or not
   componentDidMount() {
      this.props.getUser();
   }

   render() {
      const {user_id, username} = this.props
      return(
         <div className="container">
            <div className="navbar-brand">
               <Link to={'/'}>RNGerbera</Link>
            </div>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon">oof</span>
            </button> */}
            {/* <div className="collapse navbar-collapse navigationmenu" id="navmenu"> */}
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
         </div>
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

// export default Navigation;
export default connect(mapStateToProps, {getUser, logoutUser})(Navigation)