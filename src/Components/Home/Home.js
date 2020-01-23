import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getNumFilteredSongs} from '../../redux/reducers/songsetReducer';
import {addFavSong} from '../../redux/reducers/songReducer';
import DisplaySongCard from '../GetRandomSong/DisplaySongCard';
import '../../stylesheets/Home.css';

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
            <div className="cardbody">
            {this.props.homeSongSet[0] ? 
               <div className="homeSongSet">
                  {this.props.homeSongSet.map((element, index) => {
                     return(
                        <DisplaySongCard key={index+1}
                        info={element}
                        addFavSong={this.props.addFavSong}
                        user_id={this.props.user_id}/>
                     )
                  })}
               </div> : null}
            <h3>Refreshes at 0:00 EST (UTC/GMT -5)</h3>
            </div>
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      user_id: reduxState.user.user_id,
      numSongs: reduxState.songset.numSongsDataBase,
      homeSongSet: reduxState.songset.homeSongSet
   } 
}

export default connect(mapStateToProps, {getNumFilteredSongs, addFavSong})(Home)