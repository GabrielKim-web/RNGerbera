import React, {Component} from 'react';
import {connect} from 'react-redux';

class DefaultSongSet extends Component {
   constructor() {
      super();

      this.state = {
         lowLevel: 1,
         highLevel: 20
      }
   }

   render() {
      const {lowLevel, highLevel} = this.state;
      let levels = [];
      for (let i = 1; i < 21; i++) {
         levels.push(i);
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
            <button onClick={() => null}>Get Set!</button>
         </div>
      )
   }
}

export default connect()(DefaultSongSet)