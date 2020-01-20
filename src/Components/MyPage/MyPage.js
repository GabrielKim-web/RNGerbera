import React, {Component} from 'react';

class MyPage extends Component {
   constructor() {
      super();

      this.state = {
         user_songSet: []
      }
   }

   render() {
      return(
         <h1>MyPage</h1>
      )
   }
}

export default MyPage;