'use strict';

const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');

var current0El = document.querySelector('#current--0');
var current1El = document.querySelector('#current--1');

var score0El = document.querySelector('#score--0');
var score1El = document.querySelector('#score--1');

const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

//********** RESET FUNCTION ********** */
const resetGame = function () {
  console.log('Start Game');

  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  Player0El.classList.remove('player--winner');
  Player1El.classList.remove('player--winner');
  Player0El.classList.add('player--active');
  Player1El.classList.remove('player--active');
};

//********** SWITCH PLAYER FUNCTION ********** */
const switchPlayer = function () {
  //set current to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;

  //change player
  activePlayer = activePlayer === 0 ? 1 : 0;

  console.log(`Switched to Player ${activePlayer + 1}`);
  //Change interface on active player
  Player0El.classList.toggle('player--active');
  Player1El.classList.toggle('player--active');
};

resetGame();

//**************************************//
//********** ROLL DICE BUTTON **********//
//**************************************//

btnRoll.addEventListener('click', function () {
  if (playing) {
    console.log(`Player ${activePlayer + 1} Rolled`);
    //Random number generator
    const diceNum = Math.floor(Math.random() * 6) + 1;

    //Dice is displayed
    diceEl.classList.remove('hidden');

    //Random number is generated
    diceEl.src = `dice-${diceNum}.png`;

    //If dice number is anything but a one add number to Current
    if (diceNum !== 1) {
      currentScore = currentScore + diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //If dice number is 1
    } else {
      //Change Player
      console.log(`Player ${activePlayer + 1} Rolled a 1`);
      switchPlayer();
    }
  }
});

//**************************************//
//************** HOLD BUTTON ***********//
//**************************************//

//when you click hold current score is added to player's score

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log(`Player ${activePlayer + 1} Held`);
    // add current to player score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    // Show new score
    document.getElementById(`score--${[activePlayer]}`).textContent =
      scores[activePlayer];
    // Check if player score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      console.log(`Player ${activePlayer + 1} Won`);
    } else {
      switchPlayer();
    }
  }
});

//**************************************//
//************ NEW GAME BUTTON *********//
//**************************************//

btnNewGame.addEventListener('click', resetGame);
