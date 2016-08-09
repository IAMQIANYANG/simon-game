/**
 * Created by pandachain on 2016-08-08.
 */

//this file uses scripts from gameplay.js

const redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

const redButton = document.querySelector('#red');
const blueButton = document.querySelector('#blue');
const greenButton = document.querySelector('#green');
const yellowButton = document.querySelector('#yellow');

let element;

var game = Gameplay;

var play = function(){
  // Gameplay.
};


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
    var timeout1 = window.setTimeout(removeClass, 250);
  }
  
  function removeClass(){
    element.classList.remove('halfOpacity')
  }
};


red.addEventListener('click', function(){
  changeOpacityAndPlayAudio('red')
});