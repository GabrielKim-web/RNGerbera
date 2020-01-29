import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLevelSongSet} from '../../redux/reducers/songsetReducer';
import '../../stylesheets/SongSet.css';

class LevelSelectSongSet extends Component {
   constructor () {
      super();

      this.state = {
         message: '',
         numSongs: 3,
         level1: 1,
         level2: 1,
         level3: 1,
         level4: 1,
         level5: 1,
         level6: 1,
         level7: 1,
      }
      this.numSongReducer=this.numSongReducer.bind(this);
      this.numSongAdder=this.numSongAdder.bind(this);
      this.sendInfo=this.sendInfo.bind(this);
   }
   
   numSongReducer() {
      const {numSongs} = this.state;
      if (numSongs <= 1 || numSongs > 7) {
         this.setState({message: 'Searching for Zero'});
      } else {
         this.setState({message: '', numSongs: numSongs - 1});
      }
   }

   numSongAdder() {
      const {numSongs} = this.state;
      if (numSongs < 1 || numSongs >= 7) {
         this.setState({message: 'To Infinity... and beyond!'});
      } else {
         this.setState({message: '', numSongs: numSongs + 1})
      }
   }

   sendInfo() {
      const {numSongs} = this.state;
      // Send ONE ARRAY that's in an object. {[level1, level2, level3]} that's equivalent to current numSongsState
      let pickedLevels = [];
      for (let i = 1; i <= numSongs; i++) {
         pickedLevels.push(this.state[`level${i}`]);
      }
      this.props.getLevelSongSet({pickedLevels});
   }

   render() {
      const {message, numSongs} = this.state;
      const {levels} = this.props;
      let songsArray = [];
      for (let i = 1; i <= numSongs; i++) {
         songsArray.push(i);
      }
      return(
         <div id="LevelSelectSongSet">
            <div className="alertmessage">
               {message}
            </div>
            <form className="numentries">
               <div className="numentriesTitle">
                  <p>Number of songs (3-7)</p>
               </div>
               <div className="numentriesform">
                  <button onClick={this.numSongReducer}>-</button>
                  {numSongs}
                  <button onClick={this.numSongAdder}>+</button>
               </div>
            </form>
            <form className="numsongentries">
               {songsArray.map((element, index) => {
                  return(
                     <div key={`song${index+1}`} className="songLevelForm">
                        <p>{`Level of song ${element}`}</p>
                        <select onChange={(e) => {this.setState({[`level${element}`]: e.target.value})}}>
                           {levels.map((element2, index2) => {
                              return(
                                 <option key={`songsArray${index}levels${index2}`} value={element2}>{element2}</option>
                              )
                           })}
                        </select>
                     </div>
                  )
               })}
            </form>
            <button onClick={this.sendInfo}>Get Set!</button>
         </div>
      )
   }
}

// export default LevelSelectSongSet;
export default connect(undefined, {getLevelSongSet})(LevelSelectSongSet)