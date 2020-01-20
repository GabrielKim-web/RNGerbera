import React, {Component} from 'react'

class AddSong extends Component {
   constructor() {
      super();

      this.state = {
         adding: false,
         songid: 0,
         name: '',
         artist: '',
         nov: 4,
         novlink: '',
         adv: 10,
         advlink: '',
         exh: 13,
         exhlink: '',
         mxm: 17,
         mxmlink: '',
         videoPlay: '',
         noFx: '',
         jacket: ''
      }
   }

   handleUserInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
   }

   render() {
      const {adding, songid, name, artist, nov, 
         novlink, adv, advlink, exh, exhlink, mxm, mxmlink, 
         videoPlay, noFx, jacket} = this.state;
      return(
         <div id="AddSong">
            {adding ? 
            <div>
               <h3>sdvx.in songId</h3>
               <input name="songid" className="songid" onChange={this.handleUserInput} value={songid} />
               <h3>name</h3>
               <input name="name" className="name" onChange={this.handleUserInput} value={name} />
               <h3>artist</h3>
               <input name="artist" className="artist" onChange={this.handleUserInput} value={artist} />
               <h3>nov</h3>
               <input name="nov" className="nov" onChange={this.handleUserInput} value={nov} />
               <h3>novlink</h3>
               <input name="novlink" className="novlink" onChange={this.handleUserInput} value={novlink} />
               <h3>adv</h3>
               <input name="adv" className="adv" onChange={this.handleUserInput} value={adv} />
               <h3>advlink</h3>
               <input name="advlink" className="advlink" onChange={this.handleUserInput} value={advlink} />
               <h3>exh</h3>
               <input name="exh" className="exh" onChange={this.handleUserInput} value={exh} />
               <h3>exhlink</h3>
               <input name="exhlink" className="mxm" onChange={this.handleUserInput} value={exhlink} />
               <h3>mxm</h3>
               <input name="mxm" className="mxm" onChange={this.handleUserInput} value={mxm} />
               <h3>mxmlink</h3>
               <input name="mxmlink" className="mxmlink" onChange={this.handleUserInput} value={mxmlink} />
               <h3>videoPlay</h3>
               <input name="videoPlay" className="videoPlay" onChange={this.handleUserInput} value={videoPlay} />
               <h3>noFx</h3>
               <input name="noFx" className="noFx" onChange={this.handleUserInput} value={noFx} />
               <h3>jacket</h3>
               <input name="jacket" className="jacket" onChange={this.handleUserInput} value={jacket} />
            </div>
            : null}
            {!adding ? 
            <button onClick={() => this.setState({adding: !adding})}>AddSong</button>
            : <div className="addSongButtons"> 
            <button onClick={() => this.setState({adding: !adding})}>Cancel</button>
            <button onClick={() => {
               // 1/16 14:01: Add condition that a song cannot be added without MINIMUM songId, title, artist, and its difficulties.
               this.props.addSong({...this.state});
               this.setState({adding: !adding,
                  songid: 0,
                  name: '',
                  artist: '',
                  nov: 4,
                  novlink: '',
                  adv: 10,
                  advlink: '',
                  exh: 13,
                  exhlink: '',
                  mxm: 17,
                  mxmlink: '',
                  videoPlay: '',
                  noFx: '',
                  jacket: ''});
               this.props.update();
            }}>Confirm</button>
            </div>}
         </div>
      )
   }
}

export default AddSong