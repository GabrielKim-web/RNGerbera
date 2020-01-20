import React, {Component} from 'react';
import './Song.css';

class Song extends Component {
   constructor() {
      super();

      this.state = {
         editing: false,
         song_id: 0,
         title: '',
         title_translated: '',
         title_romanized: '',
         artist: '',
         nov_level: 4,
         nov_link: '',
         adv_level: 10,
         adv_link: '',
         exh_level: 13,
         exh_link: '',
         mxm_level: 17,
         mxm_link: '',
         video_play: '',
         video_nofx: '',
         video_og: '',
         jacket: '' 
      }
   }

   handleUserInput = (e) => {
      this.setState({[e.target.name]: e.target.value});
   }

   editSong() {
      for (var prop in this.props.info) {
         if (this.props.info[prop] === null) {
            this.props.info[prop] = ''
         }
      }
      const {song_id, title, title_translated, title_romanized, artist, nov_level, nov_link, adv_level, adv_link, exh_level, exh_link, mxm_level, mxm_link, video_play, video_nofx, video_og, jacket} = this.props.info;
      this.setState({
         song_id, title, title_translated, title_romanized, artist, nov_level, nov_link, adv_level, adv_link, exh_level, exh_link, mxm_level, mxm_link, video_play, video_nofx, video_og, jacket
      })  
   }

   render() {
      const {editing} = this.state;
      // title translated, title romanized, artist, video_play, video_og are not used in this.props.info
      const {id, title, nov_level, nov_link, adv_level, adv_link, exh_level, exh_link, mxm_level, mxm_link, video_nofx, jacket} = this.props.info;
      if (!editing) {
      return(
         <tr className="body">
            <th>{this.props.number}</th>
            <th><img className="jacket" src={jacket} alt={`${title} jacket`}/></th>
            <th>{title}</th>
            {/* rel="noopener noreferrer": https://mathiasbynens.github.io/rel-noopener */}
            <th><a href={nov_link} alt="sdvx.in NOV" target="_blank" rel="noopener noreferrer" title="hahargh">{nov_level}</a></th>
            <th><a href={adv_link} alt="sdvx.in ADV" target="_blank" rel="noopener noreferrer" title="hahargh">{adv_level}</a></th>
            <th><a href={exh_link} alt="sdvx.in EXH" target="_blank" rel="noopener noreferrer" title="hahargh">{exh_level}</a></th>
            <th><a href={mxm_link} alt="sdvx.in MXM" target="_blank" rel="noopener noreferrer" title="hahargh">{mxm_level}</a></th>
            <th><a href={video_nofx} alt="NO_FX Youtube" target="_blank" rel="noopener noreferrer" title="hahargh">NO FX</a></th>
            <th><button onClick={() => {
               // BLACK DIAMOND: Add confirmation window to confirm deleting of song
               this.props.delete(id);
               this.props.update();
            }}>Delete</button>
            <button onClick={() => {
               this.editSong()
               this.setState({editing: !editing})
               // this.props.update()
            }}>Edit</button></th>
         </tr>   
      ) 
      } else {
         return(
            <tr className="body">
               <th>{this.props.number}</th>
               <th><input placeholder="Jacket URL" name="jacket"value={this.state.jacket} onChange={this.handleUserInput}/></th>
               <th><input placeholder="Song name" name="title" value={this.state.title} onChange={this.handleUserInput}/></th>
               <th><input placeholder="1-20" name="nov_level" value={this.state.nov_level} onChange={this.handleUserInput}/>
               <input placeholder="Link to chart" name="nov_link" value={this.state.nov_link} onChange={this.handleUserInput}/></th>
               <th><input placeholder="1-20" name="adv_level" value={this.state.adv_level} onChange={this.handleUserInput}/>
               <input placeholder="Link to chart" name="adv_link" value={this.state.adv_link} onChange={this.handleUserInput}/></th>
               <th><input placeholder="1-20" name="exh_level" value={this.state.exh_level} onChange={this.handleUserInput}/>
               <input placeholder="Link to chart" name="exh_link" value={this.state.exh_link} onChange={this.handleUserInput}/></th>
               <th><input placeholder="1-20" name="mxm_level" value={this.state.mxm_level} onChange={this.handleUserInput}/>
               <input placeholder="Link to chart" name="mxm_link" value={this.state.mxm_link} onChange={this.handleUserInput}/></th>
               <th><input placeholder="NoFX URL" name="video_nofx" value={this.state.video_nofx} onChange={this.handleUserInput}/></th>
               <th><button onClick={() => {
                  // BLACK DIAMOND: Add confirmation window to confirm deleting of song
                  this.setState({editing: !editing})
               }}>Cancel</button>
               <button onClick={() => {
                  this.props.edit({...this.state}, id);
                  this.setState({editing: !editing})
                  this.props.update();
               }}>Confirm Changes</button></th>
            </tr>   
         ) 
      };
   }
}

export default Song;