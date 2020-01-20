import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducers/userReducer';
import DefaultSongSet from './DefaultSongSet';
import LevelSelectSongSet from './LevelSelectSongSet';
import WeightApplierSongSet from './WeightApplierSongSet';

class SongSet extends Component {
   constructor() {
      super();

      this.state = {
         currentSearchState: 'standard',
         generatedSongSet: [],
      }
   }

   componentDidMount() {
      this.props.getUser();
   }

   submitInfo() {
      //Get currentSearchState to change how info is submitted
   }

   render() {
      // if(!this.props.user_id) {
      //    return(
      //       <div id="SongSetError">
      //          <h3>You must be logged in to do that.</h3>
      //       </div>
      //    )
      // } else {
         switch(this.state.currentSearchState) {
            case('levelrange'):
               return (
                  <div id="SongSet">

                  </div>
               )
            case('weight'):
               return(
                  <div id="SongSet">
                     
                  </div>
               )
            default:
               return(
                  <div id="SongSet">
                     <DefaultSongSet />
                  </div>
               )
         }
      }
   // }
}

const mapStateToProps = reduxState => {
   return {
      user_id: reduxState.user.user_id,
      username: reduxState.user.username
   }
}

// export default SongSet;
export default connect(mapStateToProps, {getUser})(SongSet)