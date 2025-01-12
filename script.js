'use strict';

const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.querySelector('#score--1');
const current0Ele = document.querySelector('#current--0');
const current1Ele = document.querySelector('#current--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let plyScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0Ele.classList.toggle('player--active');
    player1Ele.classList.toggle('player--active');
};
let playing = true;
let resetGame = function () {
    playing = true;
    score0Ele.textContent = 0;
    score1Ele.textContent = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0Ele.classList.add('player--active')
    plyScores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    diceEle.src = `./Images/dice-0.png`;
}

btnroll.addEventListener('click', function () {
    if (playing) {
        const diceNum = Math.trunc(Math.random() * 6) + 1;

        if (diceEle.classList.contains('hidden')) diceEle.classList.remove('hidden');
        diceEle.src = `./Images/dice-${diceNum}.png`;

        if (diceNum != 1) {
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        plyScores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = plyScores[activePlayer];

        if (plyScores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', resetGame);