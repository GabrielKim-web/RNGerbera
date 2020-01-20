import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class RegisterAdmin extends Component {
   constructor() {
      super();

      this.state = {
         username: '',
         password: '',
         email: '',
         key: '',
         showPassword: false
      }
   }

   // 1/13 18:01: Check for idiots by seeing if a user is logged in before attempting to do this.
   componentDidMount = {
      
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
   handleKeyInput(value) {
      this.setState({key: value});
   }

   registerAdmin(user, password, email, key) {
      this.setState({username: '', password: '', email: '', key: ''});
      axios.post(`/user/registeradmin`, {user, password, email, key}).then(() => {
         alert("Administrator account created successfully. Please log in.");
         // 11/13 18:52: Redirects must be rendered in JSX. These don't work here.
         return (<Redirect to="/"/>)
      }).catch(err => {
         alert(`${err}: Have you tried turning it off and turning it back on again?`)
         return (<Redirect to="/"/>)
      });
   }

   render() {
      const {username, password, email, key} = this.state;
      return(
         <div id = "RegisterAdmin">
            <h1>Register Admin</h1>
            <h2>Note: Make sure you have a key from an admin to be able to create an admin account.</h2>
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
            <input placeholder="Administrator Key" 
            type="password"
            value={key}
            id="keyInput"
            onChange={e => this.handleKeyInput(e.target.value)}/>
            <button onClick={() => this.registerAdmin(username, password, email, key)}>Register</button>
         </div>
      )
   }
}

export default RegisterAdmin;