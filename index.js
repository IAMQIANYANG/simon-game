/**
 * Created by pandachain on 2016-08-08.
 */

//this file uses scripts from ColorGame.js

// all audios  
const redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// buttons to control the game
const startButton = document.querySelector('#normal');
const strictButton = document.querySelector('#strict');
const infoBox = document.querySelector('#info');
const ReplayButton = document.querySelector('#restart');

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
  if (game.isWinning()){
    infoBox.innerHTML = '<p>Congratulations! You won!</p>';
    return;
  }
  infoBox.innerHTML = '<p>' + game.round + '</p>';

  arrayChangeOpacityAndPlayAudio(game.getCurrentAnswer(), getSpeed());

};

// get and check player input
let getPlayerInputAndCheck = function(e){
  if (playerCanPlay) {
    game.playerAnswer.push(e.target.id);
    changeOpacityAndPlayAudio(e.target.id);
    let isCorrect = game.checkPlayerInput();
    if (isCorrect === 'continue') {
      return;
    } else if (!isCorrect) {
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
      changeOpacityAndPlayAudio(list[i]);
      if (i === list.length - 1){
        playerCanPlay = true;
      }
    }

    changeColorTimeout();

  }
};

// change button color and play audio for a single color;

let changeOpacityAndPlayAudio = function(color){
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
      window.setTimeout(removeClass, 150);
    }

    function removeClass(){
        element.classList.remove('halfOpacity');
      }
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

ReplayButton.addEventListener('click', function(){
  game.restartGame();
  computerPlayTimeout()
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
