import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getNumFilteredSongs} from '../../redux/reducers/songsetReducer';
import DisplaySongCard from '../GetRandomSong/DisplaySongCard';

class Home extends Component {
   constructor() {
      super();

      this.state = {

      }
   }

   componentDidMount() {
      //upon loading, loads songs to search from
      this.props.getNumFilteredSongs()
   }


   render() {
      return(
         <div id="Home">
            <h1>Home</h1>
            <h2>Today's Random Song Set</h2>
               {this.props.homeSongSet ? this.props.homeSongSet.map((element, index) => {
                  return(
                     <DisplaySongCard key={index+1}
                     info={element[0]}/>
                  )
               }) : null}
            <h3>Total songs to pull from: {this.props.numSongs}</h3>
            <h3>Refreshes at 0:00 EST (UTC/GMT -5)</h3>
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      numSongs: reduxState.songset.numSongsDataBase,
      homeSongSet: reduxState.songset.homeSongSet
   } 
}

export default connect(mapStateToProps, {getNumFilteredSongs})(Home)