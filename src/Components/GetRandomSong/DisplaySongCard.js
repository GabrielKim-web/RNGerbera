import React, {Component} from 'react';
import '../../stylesheets/DisplaySongCard.css';
// should be a functional component? 

class DisplaySongCard extends Component {
   render() {
      // To make it match, I'm going to need to pull the level from the global state.
      const {id, title, satisfyParamLevel, satisfyParamLink, satisfyParamMsg, jacket} = this.props.info;
      const {user_id} = this.props
      return(
         <div id="DisplaySongCard">
            <img className="DisplaySongJacket" src={jacket} alt={`${title} jacket`}/>
            {/* Shrink the size in CSS depending on the length of the title. */}
            {/* <h3 className="defaultTitle">{title}</h3> */}
            {title.length > 15 ? <h3 className="longTitle">{title}</h3>
            : <h3 className="defaultTitle">{title}</h3>}
            <a href={satisfyParamLink} alt="sdvx.in" target="_blank" rel="noopener noreferrer" title="hahargh">{`${satisfyParamMsg} ${satisfyParamLevel}`}</a>
            {/* I will not show the favorite button on the Tournament page, since the addFavSong will not be passed down in that component.
            Therefore, needing to check the addFavSong that exists or not is not necessary. */}
            {user_id && this.props.addFavSong ? 
            <button className="favorite" onClick={() => this.props.addFavSong(user_id, id)}></button>
         : null}
         </div>
      )
   }
}

export default DisplaySongCard;