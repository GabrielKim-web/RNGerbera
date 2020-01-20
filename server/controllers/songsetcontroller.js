const getNumFilteredSongs = async (req, res) => {
   const db = req.app.get('db');
   let homeSet = [];
   const {level} = req.params;
   //we get the number of songs to pull from; is returned as an array with an object inside
   const numSongs = await db.get_filtered_num_songs(level);
   for (let i = 0; i < 3; i++){
      let filteredSong = await db.get_homeset(level, numSongs[0].count)
      //we need to pull the difficulty that matches what the user filtered
      if (filteredSong[0].nov_level == level) {
         filteredSong[0].satisfyParamLevel = filteredSong[0].nov_level;
         filteredSong[0].satisfyParamLink = filteredSong[0].nov_link;
         filteredSong[0].satisfyParamMsg = 'NOV'
      } else if (filteredSong[0].adv_level == level) {
         filteredSong[0].satisfyParamLevel = filteredSong[0].adv_level;
         filteredSong[0].satisfyParamLink = filteredSong[0].adv_link;
         filteredSong[0].satisfyParamMsg = 'ADV'
      } else if (filteredSong[0].exh_level == level) {
         filteredSong[0].satisfyParamLevel = filteredSong[0].exh_level;
         filteredSong[0].satisfyParamLink = filteredSong[0].exh_link;
         filteredSong[0].satisfyParamMsg = 'EXH'
      } else if (filteredSong[0].mxm_level == level) {
         filteredSong[0].satisfyParamLevel = filteredSong[0].mxm_level;
         filteredSong[0].satisfyParamLink = filteredSong[0].mxm_link;
         switch (filteredSong[0].mxm_link.charAt(23)) {
            case 'i':
               filteredSong[0].satisfyParamMsg = 'INF'
               break;
            case 'g':
               filteredSong[0].satisfyParamMsg = 'GRV'
               break;
            case 'h':
               filteredSong[0].satisfyParamMsg = 'HVN'
               break;
            case 'v':
               filteredSong[0].satisfyParamMsg = 'VVD'
               break;
            default: filteredSong[0].satisfyParamMsg = 'MXM'
         }} else {console.log("You shouldn't get here.")}
      homeSet.push(filteredSong);
   }
   res.status(200).json(homeSet);
}

const getSpecificSong = async (req, res) => {
   const db = req.app.get('db');
   // songToGet is referencing the id of the song, the primary key
   const {songToGet} = req.params;
   // WHAT THE FUCK
   //SELECT * FROM songs WHERE mxm_level = 18 OFFSET floor(random()*315) LIMIT 1;
}

module.exports = {
   getNumFilteredSongs,
   getSpecificSong
}