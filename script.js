'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;

const scores = [0, 0];
let currenScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currenScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
const rollDice = function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display a dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Checked for rolled 1: if true,
    if (dice !== 1) {
      currenScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
};

const holdScore = function () {
  if (playing) {
    //1. add current score to active player score
    scores[activePlayer] += currenScore;
    // score[1] = scores[1]+ currenScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player score is >= 100
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
};

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  scores[1] = 0;
  scores[0] = 0;
  currenScore = 0;
  playing = true;
  switchPlayer();
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
