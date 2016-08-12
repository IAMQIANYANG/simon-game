/**
 * Created by pandachain on 2016-08-08.
 */

var ColorGame = function(){
  const allColors = ['red', 'green', 'blue', 'yellow'];

  let answer = [];
  
  const self = {

    playerAnswer: [],

    round: 1,

    startGame: function(){
      self.generateAnswer()
    },
    
    resetGame: function(){
      answer = [];
      self.playerAnswer = [];
      self.round = 1;
    },

    restartGame: function(){
      self.playerAnswer = [];
      self.round = 1;
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

    getCurrentAnswer: function(){
      return answer.slice(0, self.round)
      },

    checkPlayerInput: function () {
      let answer = self.getCurrentAnswer();
      let playerAnswer = self.playerAnswer;
      if (playerAnswer.length < answer.length) {

        for (let i = 0; i < playerAnswer.length; i++) {
          if (answer[i] !== playerAnswer[i]) {
            self.clearPlayerAnswer();
            return false;
          }
        }
        return 'continue';

      } else if (playerAnswer.length === answer.length) {
        if (answer[answer.length - 1] !== playerAnswer[playerAnswer.length - 1]) {
          self.clearPlayerAnswer();
          return false
        } else {
          self.clearPlayerAnswer();
          self.round += 1;
          return true;
        }
      }

    },

    clearPlayerAnswer: function(){

      self.playerAnswer = [];
    },

    isWinning: function(){
      if (self.round > 20 && self.checkPlayerInput()){
        return true;
      }
    }
  };

  return self;

};

