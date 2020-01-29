import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDefaultSongSet} from '../../redux/reducers/songsetReducer';
import '../../stylesheets/Home.css';
import '../../stylesheets/SongSet.css';

class DefaultSongSet extends Component {
   constructor() {
      super();

      this.state = {
         lowLevel: 1,
         highLevel: 20,
         numSongs: 3
      }
   }

   render() {
      const {lowLevel, highLevel, numSongs} = this.state;
      const {levels, songs} = this.props;
      return(
         <div id="DefaultSongSet">
            <form>
               <div className="numberSongs">
                  {/* select is roughly the same as an input; needs an onChange property */}
                  <p>Number of Songs (default: 3)</p>
                  <select id="numSongs" onChange={(e) => {this.setState({numSongs: e.target.value})}}>
                     {songs.map((element, index) => {
                        return(
                           <option key={index+1} value={element}>{element}</option>
                        )
                     })}
                  </select>
               </div>
               <div className="lowerboundary">
                  <p>Lower Level Boundary</p>
                  <select id="lowLevelSelect" onChange={(e) => {this.setState({lowLevel: e.target.value})}}>
                        {levels.map((element, index) => {
                           return(
                           <option key={index+1} value={element}>{element}</option>
                           )
                        })}
                     </select>
               </div>
               <div className="higherboundary">
                  <p>Higher Level Boundary</p>
                     <select id="highLevelSelect" onChange={(e) => {this.setState({highLevel: e.target.value})}}>
                        {levels.map((element, index) => {
                           return(
                              <option key={index+1} value={element}>{element}</option>
                           )}
                        )}
                     </select>
               </div>
            </form>
            <button onClick={() => this.props.getDefaultSongSet({lowLevel, highLevel, numSongs})}>Get Set!</button>
         </div>
      )
   }
}

export default connect(undefined, {getDefaultSongSet})(DefaultSongSet)