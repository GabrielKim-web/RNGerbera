import React, {Component} from 'react';

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
            <form>
               <input type="radio" name="currentSearchState" value="standard" onChange={this.props.handleInput} checked={this.props.currentSearchState === 'standard'}/> Normal
               <input type="radio" name="currentSearchState" value="weight" onChange={this.props.handleInput} /> Weight
               <input type="radio" name="currentSearchState" value="levelrange" onChange={this.props.handleInput} /> Level
            </form>
         </div>
      )
   }
}

export default RadioButtonSearch;