'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
let player1TotalScr = document.querySelector('#score--0');
let player2TotalScr = document.querySelector('#score--1');
let player1CurrentScr = document.querySelector('#current--0');
let player2CurrentScr = document.querySelector('#current--1');

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
let currentScr = 0;
let player1Scr, player2Scr, activePlayer;
dry();

function dry() {
  player1Scr = 0;
  player2Scr = 0;
  activePlayer = 0;
  player1TotalScr.textContent = 0;
  player2TotalScr.textContent = 0;
  dice.classList.add('hidden');
}

rollDiceBtn.addEventListener('click', function () {
  if (player1Scr < 100 && player2Scr < 100) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;
    dice.classList.remove('hidden');
    if (randomNumber !== 1) {
      currentScr += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScr;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 1 ? 0 : 1;
      currentScr = 0;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (player1Scr < 100 && player2Scr < 100) {
    if (activePlayer === 0) {
      player1Scr += currentScr;
      player1TotalScr.textContent = player1Scr;
      currentScr = 0;
      activePlayer = 1;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
      document.getElementById(`current--0`).textContent = 0;
    } else if (activePlayer === 1) {
      player2Scr += currentScr;
      player2TotalScr.textContent = player2Scr;
      currentScr = 0;
      activePlayer = 0;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
      document.getElementById(`current--1`).textContent = 0;
    }
  }
  if (player1Scr >= 100) {
    player1.classList.add('player--winner');
    dice.classList.add('hidden');
    player1.classList.remove('player--active');
  }
  if (player2Scr >= 100) {
    player2.classList.add('player--winner');
    dice.classList.add('hidden');
    player2.classList.remove('player--active');
  }
});

newBtn.addEventListener('click', function () {
  dry();
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
});
