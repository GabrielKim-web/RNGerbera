import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSongList, getNumSongs, addSong, deleteSong, editSong} from '../../redux/reducers/songReducer';
import Song from '../Song/Song';
import AddSong from '../AddSong/AddSong';
import '../../stylesheets/SongList.css';

class SongList extends Component {
   constructor() {
      super();

      this.state = {
         pageNum: 1,
         numSongsDisplay: 50
      }
      this.updateSongList=this.updateSongList.bind(this);
   }

   componentDidMount() {
      this.props.getSongList(this.state.pageNum);
      this.props.getNumSongs();
   }

   prevGroup() {
      const {numSongs} = this.props;
      if(this.state.pageNum === 1 ) {
         this.setState({pageNum: Math.ceil(numSongs/50)})
      } else {
         this.setState({pageNum: this.state.pageNum - 1})
      }
      this.updateSongList();
   }

   nextGroup() {
      const {numSongs} = this.props;
      if(this.state.pageNum === Math.ceil(numSongs / 50)) {
         this.setState({pageNum: 1});
      } else {
         this.setState({pageNum: this.state.pageNum + 1})
      }
      this.updateSongList();
   }

   updateSongList() {
      setTimeout(() => this.props.getSongList(this.state.pageNum), 100);
   }
   render() {
      const {songList, numSongs, is_Admin} = this.props;
      const {pageNum} = this.state;
      return(
         <div id="SongList">
            <div className="songlistdata">
               {/* 1/16 9:21: AddSong button should only show if the user is an admin
               Check the user currently logged in to see if this true or not. */}
               {is_Admin ? 
               <div className="admincontrols">
                  <AddSong addSong={this.props.addSong}
                  update={this.updateSongList}/>
               </div>
               : null}
               
            </div>
            {/* 1/15 10:31: Need to style this table. */}
            <table className="songTable">
               <thead>
                  <tr className="header">
                     <th>#</th>
                     <th>Jacket</th>
                     <th>Name</th>
                     <th>NOV</th>
                     <th>ADV</th>
                     <th>EXH</th>
                     <th>MXM</th>
                     <th>NO_FX</th>
                     {/* User must be admin for this column to appear. */}
                     {is_Admin ? <th></th> : null}
                  </tr>
               </thead>
               <tbody>
                     {songList ? songList.map((element, index) => {
                        // check if admin exists
                        if (is_Admin) {
                           return(
                              <Song key={index+1} 
                              info={element} 
                              number={((pageNum-1)*50) +index+1}
                              update={this.updateSongList}
                              delete={this.props.deleteSong}
                              edit={this.props.editSong}/>
                           )
                        } else {
                           return(
                              <Song key={index+1} 
                              info={element} 
                              number={((pageNum-1)*50) +index+1}
                              update={this.updateSongList}/>
                           )
                        }
                     }) : null}
               </tbody>
            </table>
            {songList && numSongs ? 
               <div className="tablenavigation">
                  <button onClick={() => this.prevGroup()}>Prev</button>
                  <strong className="page">Page {pageNum} of {Math.ceil(numSongs / 50)}</strong>
                  <button onClick={() => this.nextGroup()}>Next</button>
               </div>
             : null}
         </div>
      )
   }
}
const mapStateToProps = reduxState => {
   return {
      songList: reduxState.song.songlist,
      numSongs: reduxState.song.numSongs,
      // EXPERIMENTAL
      is_Admin: reduxState.user.is_Admin
   }
}

export default connect(mapStateToProps, {getSongList, getNumSongs, addSong, deleteSong, editSong})(SongList)