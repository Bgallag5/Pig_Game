"use strict";

//Starter Variables
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

//hide the dice on start
const diceEl = document.querySelector(".dice");
diceEl.classList.add("hidden");

//Buttons
const Roll = document.querySelector(".btn--roll")
const NewGame = document.querySelector(".btn--new");
const Hold = document.querySelector(".btn--hold");


let currentScore, activePlayer, scores;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //enable roll and hold buttons
  document.querySelector(".btn--roll").disabled = false;
  document.querySelector(".btn--hold").disabled = false;

  document.querySelector('.player--0').classList.remove('player--winner')
  document.querySelector('.player--0').classList.add('player--active');

  document.querySelector('.player--1').classList.remove('player--winner', 'player--active')
  
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  
  diceEl.classList.add("hidden");
  };
  
init();

//Game Logic
Roll.addEventListener('click', () => {
  //Generate dice roll
  let roll = Math.floor(Math.random() * 6 + 1);
  //Display dice roll img
  displayDice(roll);
  //if 1 pass turn
  if (roll !== 1) {
    //add roll to scrore
    currentScore += roll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    passTurn();
  }
})


const displayDice = function (roll) {
  if (roll) {
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${roll}.png`;
  }
};


Hold.addEventListener('click', () => {
    //1. add current score to playersScore
    scores[activePlayer] += currentScore
    console.log(scores);
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    //check for 100 => if => win game
    if (scores[activePlayer] >= 20){
        //add class list player--winner
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

        //disable roll and hold buttons
        document.querySelector(".btn--roll").disabled = true;
        document.querySelector(".btn--hold").disabled = true;
    } else{
    passTurn();
    }
})


const passTurn = function () {
    //set current score in DOM back to 0
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //remove class 'player--active'
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    //pass turn
    activePlayer = activePlayer === 0 ? 1 : 0;
    //reset current score
    currentScore = 0;
    //give 'player--active' class to activePlayer for dom styling 
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

NewGame.addEventListener('click', () => {
    console.log('NEW GAME');
    init();
})