function pickLevelFromWeight (array, weightTotal, numSongs) {
   //[[15, 20], [16, 30], [17, 50]]
   // How many times shall we do this?
   let howManyParameters = array.length;
   if (howManyParameters > 4) {return [1,20]}
   if (array.length < 4) {
      for (let i = 0; i < (4-array.length); i++) {
         array.push([0,0]);
      }
   }
   let pickedLevels = [];
   // for (let i = 0; i < 3; i++) {
   for (let i = 1; i <= numSongs; i++) {
      let randomNumber = Math.floor(Math.random() * ((weightTotal) - 1 + 1) + 1);
         if (randomNumber <= array[0][1]) {
            pickedLevels.push(array[0][0]);
         } else if (randomNumber <= (array[0][1] + array[1][1])) {
            pickedLevels.push(array[1][0]);
         } else if (randomNumber <= (array[0][1] + array[1][1] + array[2][1])) {
            pickedLevels.push(array[2][0]);
         } else if (randomNumber <= (array[0][1] + array[1][1] + array[2][1] + array[3][1])) {
            pickedLevels.push(array[3][0]);
         } else {
            console.log("You're not supposed to get here.");
            pickedLevels.push(17);
         }
   }
   return pickedLevels;
}

module.exports = {
   pickLevelFromWeight
}