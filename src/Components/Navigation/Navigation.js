import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser, logoutUser} from '../../redux/reducers/userReducer';

class Navigation extends Component {

   // I'm going to need a componentDidUpdate to see if the user is logged in or not
   componentDidMount() {
      this.props.getUser();
   }

   render() {
      const {user_id, username} = this.props
      return(
         <div id="Navigation">
            <header>
               <Link to={'/'}>Kyoukuken</Link>
            </header>
            {/* The links to either MyPage, or Login / Register should be conditionally rendered */}
            <div className="userinfo">
               {this.props.username ? (
                  <div>
                     <Link to={`/user/mypage/${user_id}`}>{username}</Link>
                     <button className="logout" onClick={() => this.props.logoutUser()}>Logout</button>
                  </div>
               ) : (
                  <div>
                     <Link to="/user/login">Log in</Link>
                     <Link to="/user/register">Register</Link>
                  </div>
               )}
            </div>
            <div className="navmenu">
               <Link to="/songset">Random Songset</Link>
               <Link to="/songlist">Song list</Link>
            </div>
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