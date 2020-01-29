import React, {Component} from 'react';
import '../../stylesheets/RadioButtonSearch.css';

class RadioButtonSearch extends Component {
   constructor () {
      super();

      this.state = {

      }
   }

   render() {
      return(
         <div id="RadioButtonSearch">
            {/* what does action do? */}
            <form className="radiobuttons">
               <div className="space">
                  <input type="radio" name="currentSearchState" value="standard" onChange={this.props.handleInput} checked={this.props.currentSearchState === 'standard'}/> Normal
               </div>
               <div className="space">
                  <input type="radio" name="currentSearchState" value="weight" onChange={this.props.handleInput} /> Weight
               </div>
               <div className="space">
                  <input type="radio" name="currentSearchState" value="levelrange" onChange={this.props.handleInput} /> Level
               </div>
            </form>
         </div>
      )
   }
}

export default RadioButtonSearch;