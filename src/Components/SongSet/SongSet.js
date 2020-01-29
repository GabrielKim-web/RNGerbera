import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducers/userReducer';
import DefaultSongSet from './DefaultSongSet';
import LevelSelectSongSet from './LevelSelectSongSet';
import WeightApplierSongSet from './WeightApplierSongSet';
import RadioButtonSearch from './RadioButtonSearch';
import DisplaySongCard from '../GetRandomSong/DisplaySongCard';
import '../../stylesheets/SongSet.css';
class SongSet extends Component {
   constructor() {
      super();

      this.state = {
         currentSearchState: 'standard',
         generatedSongSet: [],
      }
      this.handleRadioInput=this.handleRadioInput.bind(this);
   }

   componentDidMount() {
      this.props.getUser();
   }

   handleRadioInput(e) {
      this.setState({[e.target.name]: e.target.value});
   }

   render() {
      let levels = [];
      for (let i = 1; i <= 20; i++) {
         levels.push(i);
      }
      let songs = [];
      for (let i = 1; i <= 7; i++) {
         songs.push(i);
      }
      
      let content;
      switch(this.state.currentSearchState) {
         // Render the radio buttons in another component;
         case('levelrange'):
            content = (
               <LevelSelectSongSet 
               levels={levels}
               songs={songs}/>
            )
            break;
         case('weight'):
            content = (
               <WeightApplierSongSet 
               levels={levels}
               songs={songs}/>
            )
            break;
         default:
            content = (
               <DefaultSongSet 
               levels={levels}
               songs={songs}/>
            )
      }
      if(!this.props.user_id) {
         return(
            <div className="headliner">
               <h3>You must be logged in to do that.</h3>
            </div>
         )
      } else {
         return (
            <div id = "SongSet">
               <RadioButtonSearch 
               handleInput={this.handleRadioInput}
               currentSearchState={this.state.currentSearchState}/>
               {content}
               <div className="setData">
                  <h3>Your Set</h3>
                  {this.props.userGeneratedSongSet[0] ? 
                  <div className="homeSongSet">
                     {this.props.userGeneratedSongSet.map((element, index) => {
                        return(
                           <DisplaySongCard key={index+1}
                           info={element}/>
                        )
                     })}
                     {/* button for bot goes here! */}
                  </div>
                     : <div className="noSongSet">
                        No data to show here...
                  </div>}
               </div>
            </div>
         )
      }
   }
}

const mapStateToProps = reduxState => {
   return {
      user_id: reduxState.user.user_id,
      username: reduxState.user.username,
      userGeneratedSongSet: reduxState.songset.userGeneratedSongSet
   }
}

export default connect(mapStateToProps, {getUser})(SongSet)