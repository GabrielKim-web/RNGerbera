import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, getUser} from '../../redux/reducers/userReducer';

class Register extends Component {
   constructor() {
      super();

      this.state = {
         username: '',
         password: '',
         email: '',
         showPassword: false
      }
   }

   // 1/13 18:01: Check for idiots by seeing if a user is logged in before attempting to do this.
   componentDidMount() {
      this.props.getUser();
   }

   handleUserInput(value) {
      this.setState({username: value});
   }

   handlePasswordInput(value) {
      this.setState({password: value});
   }

   handleEmailInput(value) {
      this.setState({email: value});
   }

   render() {
      const {username, password, email} = this.state;
      if (this.props.user_id) {
         return(
            <Redirect to="/" />
         )
      }
      return(
         <div id = "Register">
            <h1>Register</h1>
            <input placeholder="Username" 
            value={username} 
            id="userInput" 
            onChange={e => this.handleUserInput(e.target.value)}/>
            <input placeholder="New Password"
            // type is a string, indicates whether password should be hidden or not
            type="password"
            value={password}
            id="passwordInput"
            onChange={e => this.handlePasswordInput(e.target.value)}/>
            <input placeholder="Email"
            value={email}
            id="emailInput"
            onChange={e => this.handleEmailInput(e.target.value)}/>
            <button onClick={() => {
               this.props.registerUser(username, password, email);
               this.setState({username: '', password: '', email: ''});
               }}>Register</button>
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      user_id: reduxState.user.user_id
   }
}

// export default Register;
export default connect(mapStateToProps, {getUser, registerUser})(Register);