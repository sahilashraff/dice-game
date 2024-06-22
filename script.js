'use strict';

// Selector for players
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');

// Required selectors
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const diceClass = document.querySelector('.dice');

let activePlayer, currentScore, playing, score;

// Intial Stage
const init = function () {
  activePlayer = 0;

  currentScore = 0;

  playing = true;

  // Storing score

  score = [0, 0];

  // Initial values of player
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  diceClass.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};

init();

// Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

// Dice roll event
rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceClass.classList.remove('hidden');
    diceClass.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Switch Player
holdDice.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document.getElementById(`score--${activePlayer}`).textContent = 'Wins 😏';
      document.getElementById(
        `score--${activePlayer === 0 ? 1 : 0}`
      ).textContent = 'Lose 😭';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceClass.classList.add('hidden');

      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
