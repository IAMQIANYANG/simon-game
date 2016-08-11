/**
 * Created by pandachain on 2016-08-08.
 */

//this file uses scripts from gameplay.js

// all audios  
const redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// buttons on the page
const startButton = document.querySelector('#normal');
const strictButton = document.querySelector('#strict');
const infoBox = document.querySelector('#info');
const restartButton = document.querySelector('#restart');

const redButton = document.querySelector('#red');
const blueButton = document.querySelector('#blue');
const greenButton = document.querySelector('#green');
const yellowButton = document.querySelector('#yellow');


// create a gampeplay object;
let game = Gameplay();

let isCorrect = true;
let currentColors = [];
let allColorSequence = [];
let strictMode = false;

//function to check if the player has won;
var isWinning = function(){
  if (currentColors.length >= 20){
    return true
  }
};

//gameplay logic for normal mode;

var playTimeout;

var playSetTimeOut = function(){
  playTimeout = window.setTimeout(play, 1000);
};

var play = function () {
  // if (isWinning()){
  //   infoBox.innerHTML = '<p>Congratulations! You won!</p>';
  //   return;
  // }
  playerCurrentColors = [];
  if (isCorrect) {
    currentColors.push(game.chooseARandomColor());
    let currentArrayLength = currentColors.length;
    allColorSequence.push(currentColors.slice(0, currentArrayLength));
    infoBox.innerHTML = '<p>' + currentColors.length + '</p>';
  }

  arrayChangeOpacityAndPlayAudio(currentColors, 1000);
  console.log("player" + playerCurrentColors)
  playerPlay();
  // checkResultTimeOut(getSpeed());

};

var timeoutResult1;
// var checkResultTimeOut = function(speed){
//   timeoutResult1 = window.setTimeout(checkResult, currentColors.length * speed);
//
//   function checkResult() {
//     if (game.test(currentColors, playerCurrentColors)) {
//       isCorrect = true;
//       play();
//     } else {
//       infoBox.innerHTML = '<p>Wrong :(</p>';
//       isCorrect = false;
//       play();
//     }
//
//   }
//
// };

//gameplay logic for strict mode
// let n = 0;
// var playStrict = function(){
//   if (isWinning()){
//     infoBox.innerHTML = '<p>Congratulations! You won!</p>';
//     return;
//   }
//   if (isCorrect && !strictMode) {
//     isWinning();
//     currentColors.push(game.chooseARandomColor());
//     let currentArrayLength = currentColors.length;
//     allColorSequence.push(currentColors.slice(0, currentArrayLength));
//     infoBox.innerHTML = '<p>' + currentColors.length + '</p>';
//   } else if(!isCorrect){
//     strictMode = true;
//     currentColors = allColorSequence[0];
//   } else if(isCorrect && strictMode){
//     infoBox.innerHTML = '<p>' + (currentColors.length + 1) + '</p>';
//     if(n < allColorSequence.length - 1){
//       n++;
//       currentColors = allColorSequence[n];
//     } else if (n >= allColorSequence.length - 1){
//       strictMode = false;
//       n=0;
//       currentColors.push(game.chooseARandomColor());
//     }
//   }
//
//   arrayChangeOpacityAndPlayAudio(currentColors, 1000);
//   playerCurrentColors = [];
//   playerPlay();
//   checkResultTimeOut2(getSpeed());
//
//   function checkResultTimeOut2(speed){
//     var timeout2 = window.setTimeout(checkResult, currentColors.length * speed);
//
//     function checkResult() {
//       if (game.ifPlayComputerSequenceEqual(currentColors, playerCurrentColors)) {
//         isCorrect = true;
//         playStrict();
//       } else {
//         infoBox.innerHTML = '<p>Wrong :(</p>';
//         isCorrect = false;
//         playStrict();
//       }
//
//     }
//
//   }
// };


//change the speed of play;
var getSpeed = function(){
  if(currentColors.length > 5 && currentColors.length <= 9){
    return 2200;
  } else if (currentColors.length > 9 && currentColors.length <= 13){
    return 1800;
  }
  return 2500;

};


// restart game
var restart = function(){
  document.location.reload(true);
};

// function to get the id of color button clicked by the player;
let playerCurrentColors = [];

var checkPlayerInput = function() {
  if (!game.ifPlayComputerSequenceEqual(currentColors, playerCurrentColors)) {
    console.log(1)
    console.log(currentColors)
    console.log(playerCurrentColors)
    isCorrect = false;
    infoBox.innerHTML = '<p>Wrong :(</p>';
    playSetTimeOut();
  } else {
    if (playerCurrentColors.length < currentColors.length) {
    } else {
      isCorrect = true;
      console.log(3);
      playSetTimeOut();
    }

  }

};

var pushClickedButtonId = function(element){
  playerCurrentColors.push(element.id);
  changeOpacityAndPlayAudio(element.id);
};

// add event listeners to color buttons;
var playerPlay = function(){
  redButton.addEventListener('click', function(){
    pushClickedButtonId(redButton);
    checkPlayerInput();
  });
  blueButton.addEventListener('click', function(){
    pushClickedButtonId(blueButton);
    checkPlayerInput();
  });
  greenButton.addEventListener('click', function(){
    pushClickedButtonId(greenButton);
    checkPlayerInput();
  });
  yellowButton.addEventListener('click', function(){
    pushClickedButtonId(yellowButton);
    checkPlayerInput();
  });

};


// function to change button effects and play audio for a color;
let element;

var changeOpacityAndPlayAudio = function(color){
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
    var timeoutRemoveOpacity = window.setTimeout(removeClass, 250);
  }
  
  function removeClass(){
    element.classList.remove('halfOpacity')
  }
};


// function to change the color button effects and play audio for an array of colors;
let timeoutColorButtonEffects;

var arrayChangeOpacityAndPlayAudio = function(list, speed) {

  for(let i =0; i < list.length; i++){

    function changeColorTimeout(){

      timeoutColorButtonEffects = window.setTimeout(colorButtonEffects, i * speed);
    }

    function colorButtonEffects(){
      changeOpacityAndPlayAudio(list[i]);
    }

    changeColorTimeout();

  }

};

// add event listeners to buttons;
startButton.addEventListener('click', function(){
  startButton.style.cssText = 'color: #F7CA18';
  play();
});

strictButton.addEventListener('click', function(){
  strictButton.style.cssText = 'color: #F7CA18';
  playStrict();
});

restartButton.addEventListener('click', function(){
  restart();
});