/**
 * Created by pandachain on 2016-08-08.
 */

var Gameplay = function(){
  let colorSequence = [];
  const allColors = ['r', 'g', 'b', 'y'];
  const redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  const yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  
  const self = {
    playerColorSequence: [],

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
    
    playAudio: function(color){
      if (color === 'red'){
        redAudio.play();
      } else if (color === 'blue'){
        blueAudio.play();
      } else if (color === 'green'){
        greenAudio.play();
      } else if (color === 'yellow'){
        yellowAudio.play();
      }
    }
    
  };

  return self;

};

