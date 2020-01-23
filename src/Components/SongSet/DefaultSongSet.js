import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDefaultSongSet} from '../../redux/reducers/songsetReducer';
import DisplaySongCard from '../GetRandomSong/DisplaySongCard'
import '../../stylesheets/Home.css';

class DefaultSongSet extends Component {
   constructor() {
      super();

      this.state = {
         lowLevel: 1,
         highLevel: 20,
         numSongs: 1
      }
   }

   render() {
      const {lowLevel, highLevel, numSongs} = this.state;
      let levels = [];
      for (let i = 1; i <= 20; i++) {
         levels.push(i);
      }
      let songs = [];
      for (let i = 1; i <= 7; i++) {
         songs.push(i);
      }
      return(
         <div id="DefaultSongSet">
            <h3>Standard SearchState</h3>
            {/* select is roughly the same as an input; needs an onChange property */}
            <select id="lowLevelSelect" onChange={(e) => {this.setState({lowLevel: e.target.value})}}>
                  {levels.map((element, index) => {
                     return(
                     <option key={index+1} value={element}>{element}</option>
                     )
                  })}
               </select>
               <select id="highLevelSelect" onChange={(e) => {this.setState({highLevel: e.target.value})}}>
                  {levels.map((element, index) => {
                     return(
                        <option key={index+1} value={element}>{element}</option>
                     )}
                  )}
               </select>
               <select id="numSongs" onChange={(e) => {this.setState({numSongs: e.target.value})}}>
                  {songs.map((element, index) => {
                     return(
                        <option key={index+1} value={element}>{element}</option>
                     )
                  })}
               </select>
            <button onClick={() => this.props.getDefaultSongSet({lowLevel, highLevel, numSongs})}>Get Set!</button>
            {this.props.userGeneratedSongSet[0] ? 
               <div className="homeSongSet">
               {this.props.userGeneratedSongSet.map((element, index) => {
                  return(
                     <DisplaySongCard key={index+1}
                     info={element}/>
                  )
               })}
               </div>
            : <div>No data to show here...</div>}
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      userGeneratedSongSet: reduxState.songset.userGeneratedSongSet
   }
}

export default connect(mapStateToProps, {getDefaultSongSet})(DefaultSongSet)