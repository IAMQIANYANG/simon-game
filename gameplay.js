/**
 * Created by pandachain on 2016-08-08.
 */

var Gameplay = function(){
  let colorSequence = [1,2];
  const allColors = ['red', 'green', 'blue', 'yellow'];
  
  const self = {
    playerColorSequence: [],

    chooseAndPushRandomColor: function(){
      let currentColor = allColors[Math.floor(Math.random()*allColors.length)];
      colorSequence.push(currentColor);
      return currentColor;
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
    
    getCurrentColorSequence: function(){
      return colorSequence;
    },
    numberOfColors:  colorSequence.length
    
  };

  return self;

};

