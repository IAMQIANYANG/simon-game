/**
 * Created by pandachain on 2016-08-08.
 */

var Gameplay = function(){
  const allColors = ['red', 'green', 'blue', 'yellow'];
  
  const self = {

    chooseAndPushRandomColor: function(){
      return allColors[Math.floor(Math.random()*allColors.length)];
    },
    
    ifPlayComputerSequenceEqual: function(array1, array2){
      if(array1.length !== array2.length) {
        return false
      } else {
        for (let i = 0; i <= array1.length; i++){
          if(array1[i] !== array2[i]) {
            return false;
          }
        }
        return true;
      }
    }

    
  };

  return self;

};

