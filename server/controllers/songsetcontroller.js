let messageCreator = (songInfo, level) => {
   if (songInfo.nov_level == level) {
      songInfo.satisfyParamLevel = songInfo.nov_level;
      songInfo.satisfyParamLink = songInfo.nov_link;
      songInfo.satisfyParamMsg = 'NOV'
   } else if (songInfo.adv_level == level) {
      songInfo.satisfyParamLevel = songInfo.adv_level;
      songInfo.satisfyParamLink = songInfo.adv_link;
      songInfo.satisfyParamMsg = 'ADV'
   } else if (songInfo.exh_level == level) {
      songInfo.satisfyParamLevel = songInfo.exh_level;
      songInfo.satisfyParamLink = songInfo.exh_link;
      songInfo.satisfyParamMsg = 'EXH'
   } else if (songInfo.mxm_level == level) {
      songInfo.satisfyParamLevel = songInfo.mxm_level;
      songInfo.satisfyParamLink = songInfo.mxm_link;
      switch (songInfo.mxm_link.charAt(23)) {
         case 'i':
            songInfo.satisfyParamMsg = 'INF'
            break;
         case 'g':
            songInfo.satisfyParamMsg = 'GRV'
            break;
         case 'h':
            songInfo.satisfyParamMsg = 'HVN'
            break;
         case 'v':
            songInfo.satisfyParamMsg = 'VVD'
            break;
         default: songInfo.satisfyParamMsg = 'MXM'
      }} else {console.log("You shouldn't get here.")}
   return songInfo;
}

let getLevels = (lowLevel, highLevel, numSongs) => {
   let levelsPerSong = [];
   lowLevel = parseInt(lowLevel)
   highLevel = parseInt(highLevel);
   //use this function to randomly determine what songs to pull at what level for each song
   //idiot-proofing
   if (lowLevel == highLevel) {
      for (let i = 1; i <= numSongs; i++) {
         levelsPerSong.push(lowLevel);
      }
      return levelsPerSong;
   }
   if (highLevel < lowLevel) {
      let subNum = lowLevel;
      lowLevel = highLevel;
      highLevel = subNum;
   }
   for (let i = 1; i <= numSongs; i++) {
      levelsPerSong.push(Math.floor(Math.random() * (highLevel - lowLevel + 1)) + lowLevel)
   }
   return levelsPerSong.sort();
}

const getNumFilteredSongs = async (req, res) => {
   const db = req.app.get('db');
   let homeSet = [];
   const {level} = req.params;
   //we get the number of songs to pull from; is returned as an array with an object inside
   const numSongs = await db.get_filtered_num_songs(level);
   for (let i = 0; i < 3; i++){
      let filteredSong = await db.get_homeset(level, numSongs[0].count)
      //we need to pull the difficulty that matches what the user filtered
      filteredSong = messageCreator(filteredSong[0], level);
      homeSet.push(filteredSong);
   }
   res.status(200).json(homeSet);
}

const getDefaultSongSet = async (req, res) => {
   const {lowLevel, highLevel, numSongs} = req.body
   const db = req.app.get('db');
   const defaultSet = [];
   //we have the lowlevel and the highlevel params from req.body, now we get a random number from that range!
   let levelPerSong = getLevels(lowLevel, highLevel, numSongs);
   for (let i = 0; i < levelPerSong.length; i++) {
      //after determining a level to pull for that song, get the number of songs that exist for that level
      let numSongs = await db.get_filtered_num_songs(levelPerSong[i]);
      //Then, use that to get an actual song that fits that level
      //1/21 11:02: Check for dupes within the set. Should NOT push and try again if there is a duplicate.
      let filteredSong = await db.get_homeset(levelPerSong[i], numSongs[0].count)
      filteredSong = messageCreator(filteredSong[0], levelPerSong[i]);
      defaultSet.push(filteredSong);
   }
   res.status(200).json(defaultSet);
}

const getLevelSongSet = async (req, res) => {
   const {pickedLevels} = req.body;
   const db = req.app.get('db');
   const userSet = [];
   for (let i = 0; i < pickedLevels.length; i++) {
      let numSongs = await db.get_filtered_num_songs(pickedLevels[i]);
      let filteredSong = await db.get_homeset(pickedLevels[i], numSongs[0].count);
      filteredSong = messageCreator(filteredSong[0], pickedLevels[i]);
      userSet.push(filteredSong);
   }
   res.status(200).json(userSet);
}

module.exports = {
   getNumFilteredSongs,
   getDefaultSongSet,
   getLevelSongSet
}