import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducers/userReducer';
import axios from 'axios';

class MyPage extends Component {
   constructor() {
      super();

      this.state = {
         username: 'Bleh',
         userData: []
      }
   }

   componentDidMount() {
      // Grab the id from the URL bar using this.props.match.params.id
      axios.get(`/user/${this.props.match.params.id}`).then(response => {
         this.setState({username: response.data});
      }).catch(err => console.log(err))
      axios.get(`/user/songs/${this.props.match.params.id}`).then(response => {
         this.setState({userData: response.data});
      }).catch(err => console.log(err))
   }

   // 1/22 13:14: Component does not update when you change between users.
   // Must refresh the page to get an update. Try to change this to be automatic.

   render() {
      const {userData} = this.state;
      if (this.props.match.params.id) {
         return (
            <div id="MyPage">
               <h3>{this.state.username}'s Page</h3>
               {userData[0] ? 
               userData.map((element, index) => {
               return (
               <img key={index+1} className="jacket" src={element.jacket} alt='no jacket'/>
               )}) : <h3>No favorite songs to display.</h3>}
            </div>
         )
      } else {
         return (
            <h3>Sigh...</h3>
         )
      }
   }
}

const mapStateToProps = reduxState => {
   return {
      favSongs: reduxState.song.favSongs,
      user_id: reduxState.user.user_id
   }
}

// export default MyPage;
export default connect(mapStateToProps, {getUser})(MyPage)