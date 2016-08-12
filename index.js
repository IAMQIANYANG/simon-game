/**
 * Created by pandachain on 2016-08-08.
 */

//this file uses scripts from colorgame.js

// all audios  
const redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
const errorAudio = new Audio('https://crossorigin.me/http://soundbible.com/grab.php?id=1540&type=mp3');
const victoryAudio = new Audio ('https://crossorigin.me/http://soundbible.com/grab.php?id=1003&type=mp3');

// buttons to control the game
const startButton = document.querySelector('#normal');
const strictButton = document.querySelector('#strict');
const infoBox = document.querySelector('#info');
const replayButton = document.querySelector('#restart');

// all color buttons
const redButton = document.querySelector('#red');
const blueButton = document.querySelector('#blue');
const greenButton = document.querySelector('#green');
const yellowButton = document.querySelector('#yellow');


// create a ColorGame object and start the game;
let game = ColorGame();
game.startGame();

// set initial values to control the flow of the game
let strictMode = false;
let playerCanPlay = false;


// set timeout for computer to play

let computerPlayTimeout = function(){
  window.setTimeout(computerPlay, 1000);
};

// computer play the colors
let computerPlay = function () {
  window.clearTimeout(sessionTimeout);
  if (game.isWinning()){
    infoBox.innerHTML = '<p>Congratulations! You won!</p>';
    playVictoryAudio();
    return;
  }
  infoBox.innerHTML = '<p>' + game.round + '</p>';

  arrayChangeOpacityAndPlayAudio(game.getCurrentAnswer(), getSpeed());

};

// function to control the length of each session (play must play within three seconds);
let sessionTimeout;
let sessionExpire = function(){
  sessionTimeout = window.setTimeout(function(){
    playErrorAudio();
    infoBox.innerHTML = '<p>Session takes too long :(</p>';
    game.playerAnswer = [];
    if(strictMode){
      game.resetGame();
      game.startGame();
      playerCanPlay = false;
    }
    computerPlayTimeout();
  }, 3000)
};

// get and check player input
let getPlayerInputAndCheck = function(e){
  if (playerCanPlay) {
    game.playerAnswer.push(e.target.id);
    window.clearTimeout(sessionTimeout);
    changeOpacityAndPlayAudio(e.target.id, 20);
    let isCorrect = game.checkPlayerInput();
    if (isCorrect === 'continue') {
      sessionExpire();
      return;
    } else if (!isCorrect) {
      playErrorAudio();
      infoBox.innerHTML = '<p>Wrong :( Try again</p>';
      if (!strictMode) {
        computerPlayTimeout();
      } else {
        game.resetGame();
        game.startGame();
        computerPlayTimeout();
      }
    } else if (isCorrect) {
      computerPlayTimeout()
    }
    playerCanPlay = false;
  }
};


//change the speed of computerPlay;
let getSpeed = function(){
  if(game.round > 5 && game.round <= 9){
    return 900;
  } else if (game.round > 9 && game.round <= 13){
    return 700;
  }
  return 1200;

};

// change button color and play audio for an array of colors;
let arrayChangeOpacityAndPlayAudio = function(list, speed) {

  for(let i = 0; i < list.length; i++){

    function changeColorTimeout(){

      window.setTimeout(colorButtonEffects, i * speed);
    }

    function colorButtonEffects(){
      changeOpacityAndPlayAudio(list[i], 100);
      if (i === list.length - 1){
        playerCanPlay = true;
        sessionExpire();
      }
    }

    changeColorTimeout();

  }
};

// change button color and play audio for a single color;

let changeOpacityAndPlayAudio = function(color, speed){
  let element;

  if(color === 'red'){
      element = redButton;
    } else if (color === 'green'){
      element = greenButton;
    } else if (color === 'blue'){
      element = blueButton;
    } else if (color === 'yellow'){
      element = yellowButton;
    }

    element.classList.add('halfOpacity');
    if (color === 'red'){
      redAudio.play();
    } else if (color === 'blue'){
      blueAudio.play();
    } else if (color === 'green'){
      greenAudio.play();
    } else if (color === 'yellow'){
      yellowAudio.play();
    }
    delayRemoveClass();

    function delayRemoveClass() {
      window.setTimeout(removeClass, speed);
    }

    function removeClass(){
        element.classList.remove('halfOpacity');
      }
  };

let playVictoryAudio = function(){
  victoryAudio.play();
};

let playErrorAudio = function(){
  errorAudio.play();
};

// add event listeners to buttons;
startButton.addEventListener('click', function(){
  startButton.style.cssText = 'color: #F7CA18';
  computerPlay();
});

strictButton.addEventListener('click', function(){
  strictButton.style.cssText = 'color: #F7CA18';
  strictMode = true;
  computerPlay();
});

replayButton.addEventListener('click', function(){
  replayButton.style.cssText = 'color: #F7CA18';

  game.restartGame();
  playerCanPlay = false;
  computerPlay()
});

// add event listeners to color buttons;
let playerPlay = function () {
  redButton.addEventListener('click', function (e) {
    getPlayerInputAndCheck(e);
  });
  blueButton.addEventListener('click', function (e) {
    getPlayerInputAndCheck(e);
  });
  greenButton.addEventListener('click', function (e) {
    getPlayerInputAndCheck(e);
  });
  yellowButton.addEventListener('click', function (e) {
    getPlayerInputAndCheck(e);
  });

};

playerPlay();
