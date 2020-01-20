import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser, getUser} from '../../redux/reducers/userReducer';

class Login extends Component {
   constructor() {
      super();

      this.state = {
         userOrEmail: '',
         password: ''
      }
   }

   componentDidMount() {
      this.props.getUser();
   }

   handleUserInput(value) {
      this.setState({userOrEmail: value});
   }

   handlePasswordInput(value) {
      this.setState({password: value});
   }

   render() {
      const {userOrEmail, password} = this.state;
      if(this.props.user_id){
         return(
            <Redirect to="/"/>
         )
      }
      return(
         <div id="Login">
            <h1>Login</h1>
            <input placeholder="Name/Email"
            value={userOrEmail}
            id="userInput"
            onChange={e => this.handleUserInput(e.target.value)}/>
            <input placeholder="Password" 
            value={password}
            type="password"
            id="passwordInput"
            onChange={e => this.handlePasswordInput(e.target.value)}/>
            <button onClick={() => {
               this.props.loginUser(userOrEmail, password)
               this.setState({userOrEmail: '', password: ''})
            }}>Log in</button>

            <h3>No account? </h3>
            <Link to="/user/register">Register here!</Link>
            {/* 1/14 10:21: As soon as user logs in, redirect them back to the Home screen */}
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      //access all of this in the Login component by using this.props
      user_id: reduxState.user.user_id,
      username: reduxState.user.username
   }
}

// export default Login;
export default connect(mapStateToProps, {getUser, loginUser})(Login);