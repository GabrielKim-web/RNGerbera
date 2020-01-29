import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWeightSongSet} from '../../redux/reducers/songsetReducer';

class WeightApplierSongSet extends Component {
   constructor () {
      super();

      this.state = {
         // custom alert message for idiots (or careless people)
         message: '',
         numSongs: 3,
         numLevels: 2,
         level1: 1,
         level1Weight: 1,
         level2: 1,
         level2Weight: 1,
         level3: 1,
         level3Weight: 1,
         level4: 1,
         level4Weight: 1
      }
      this.numLevelAdder=this.numLevelAdder.bind(this);
      this.numLevelReducer=this.numLevelReducer.bind(this);
      this.sendInfo=this.sendInfo.bind(this);
   }

   numLevelReducer() {
      const {numLevels} = this.state;
      if (numLevels === 3 || numLevels === 4) {
         this.setState({message: '', numLevels: numLevels - 1})
      } else {
         this.setState({message: "Searching by one level? Use Normal searchstate"})
      }
   }
   numLevelAdder() {
      const {numLevels} = this.state;
      if (numLevels === 2 || numLevels === 3) {
         this.setState({message: '', numLevels: numLevels + 1})
      } else {
         this.setState({message: "You cannot search for more than four levels at a time."})
      }
   }
   sendInfo() {
      const {numSongs, numLevels, level1, level1Weight, level2, level2Weight, level3, level3Weight, level4, level4Weight} = this.state;
      //combine level and their weight into one array, then have that in another array
      let levelWeightData = [];
      let weightTotal = parseInt(level2Weight) + parseInt(level1Weight);
      // for intentional fall through, add comment falls through to bypass warning message
      switch(numLevels) {
         case 4: levelWeightData.push([parseInt(level4), parseInt(level4Weight)]);
         weightTotal += parseInt(level4Weight);
         /* falls through */
         case 3: levelWeightData.push([parseInt(level3), parseInt(level3Weight)]);
         weightTotal += parseInt(level3Weight);
         /* falls through */
         default: levelWeightData.push([parseInt(level2), parseInt(level2Weight)], [parseInt(level1), parseInt(level1Weight)]);
      }
      this.props.getWeightSongSet(levelWeightData, weightTotal, parseInt(numSongs));
   }

   render() {
      const {message, numLevels} = this.state;
      const {levels, songs} = this.props;
      //create the arrays
      let weight = [];
      for (let i = 1; i <= 10; i++) {
         weight.push(i);
      }
      let levelArray = [];
      for (let i = 1; i <= numLevels; i++) {
         levelArray.push(i);
      }
      return(
         <div id="WeightApplierSongSet">
            <div className="alertmessage">
               {message}
            </div>
            <form className="numentries">
               <button onClick={this.numLevelReducer}>-</button>
               {numLevels}
               <button onClick={this.numLevelAdder}>+</button>
            </form>
            <form className="numsongentries">
               <p>Number of songs (default: 3)</p>
               <select onChange={(e) => {this.setState({numSongs: e.target.value})}}>
                  {songs.map((element, index) => {
                     return(
                        <option key={index+1} value={element}>{element}</option>
                     )
                  })}
               </select>
            </form>
            <form className="weightentries">
               {levelArray.map((element, index) => {
                  return (
                     <div key={index+1}>
                        <div className="levelWeightTitle">
                           <p>LevelWeight {element}</p>
                        </div>
                        <p>Level</p>
                        <select className={`level${index+1}input`} onChange={(e) => {this.setState({[`level${index+1}`]: e.target.value})}}>
                           {levels.map((element2, index2) => {
                              return(
                                 <option key={`levelArray${index}levels${index2}`} value={element2}>{element2}</option>
                              )
                           })}
                        </select>
                        <p>Weight (1-10)</p>
                        <select className={`weight${index+1}input`} onChange={(e) => {this.setState({[`level${index+1}Weight`]: e.target.value})}}>
                           {weight.map((element2, index2) => {
                              return(
                                 <option key={`levelArray${index}weight${index2}`} value={element2}>{element2}</option>
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
export default connect(undefined, {getWeightSongSet})(WeightApplierSongSet)