/**
 * Created by pandachain on 2016-08-08.
 */

var Gameplay = function(){
  let colorSequence = [];
  let allColors = ['r', 'g', 'b', 'y'];

  const self = {
    generateSequence: function(){
      for (let i = 0; i < 20; i++){
        colorSequence.push(self.chooseRandomColor());
      }
      return colorSequence;
    },

    chooseRandomColor: function(){
      return allColors[Math.floor(Math.random()*allColors.length)];
    },


    ifPlayComputerSequenceEqual: function(){
      if(colorSequence.length !== self.playerColorSequence.length) {
        return false
      } else {
        for (let i = 0; i <= colorSequence.length; i++){
          if(colorSequence[i] !== self.playerColorSequence[i]) {
            return false;
          }
        }
        return true;
      }
    },

    playerColorSequence: [],

  };

  return self;

};

