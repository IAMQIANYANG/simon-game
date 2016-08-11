/**
 * Created by pandachain on 2016-08-08.
 */

var Colorgame = function(){
  const allColors = ['red', 'green', 'blue', 'yellow'];

  let answer = [];
  
  const self = {

    playerAnswer: [],

    round: 1,

    startGame: self.generateAnswer(),

    resetGame: function(){
      answer = [];
      self.playerAnswer = [];
    },
    chooseARandomColor: function () {
      return allColors[Math.floor(Math.random() * allColors.length)];
    },

    generateAnswer: function() {
      for (let i = 0; i < 20; i++) {
        answer.push(self.chooseARandomColor());
      }
    },

    getAnswer: function(n){
      return answer.slice(0,n);
    },

    checkPlayerInput: function () {
      let answer = self.getAnswer(self.round);
      let playerAnswer = self.playerAnswer;
      if (playerAnswer.length < answer.length) {

        for (let i = 0; i < playerAnswer.length; i++) {
          if (answer[i] !== playerAnswer[i]) {
            self.playerAnswer = [];
            return false;
          }
        }
        return 'continue';

      } else if (playerAnswer.length === answer.length) {
        if (answer[answer.length - 1] !== playerAnswer[playerAnswer.length - 1]) {
          self.playerAnswer = [];
          return false
        } else {
          self.round += 1;
          return true;
        }
      }

    }
  };

  return self;

};

