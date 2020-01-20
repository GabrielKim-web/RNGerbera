import React, {Component} from 'react';
import './DisplaySongCard.css';
// should be a functional component? 

class DisplaySongCard extends Component {
   constructor() {
      super();

      this.state = {

      }
   }

   componentDidMount() {

   }

   //checks which chart of the song matches the difficulty you specified

   render() {
      // To make it match, I'm going to need to pull the level from the global state.
      const {title, satisfyParamLevel, satisfyParamLink, satisfyParamMsg, jacket} = this.props.info;
      return(
         <div id="DisplaySongCard">
            <img className="jacket" src={jacket} alt={`${title} jacket`}/>
            <h3>{title}</h3>
            <a href={satisfyParamLink} alt="sdvx.in" target="_blank" rel="noopener noreferrer" title="hahargh">{`${satisfyParamMsg} ${satisfyParamLevel}`}</a>
         </div>
      )
   }
}

export default DisplaySongCard;