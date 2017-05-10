const symbol = document.querySelector('#symbol-select');
const gameField = document.querySelector('#cells');

let playerSymbol = '';
let computerSymbol = '';
let lastMoveSymbol = '';
const moves = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const chooseSymbol = function chooseSymbol(e) {
  if (e.target !== e.currentTarget) {
    const choice = e.target.textContent;
    e.target.style.backgroundColor = 'yellow';
    playerSymbol = (choice === 'X') ? 'X' : 'O';
    computerSymbol = (playerSymbol === 'X') ? 'O' : 'X';
    symbol.removeEventListener('click', chooseSymbol, false);
    console.log(choice);
  }
};

const playerMove = function playerMove(e) {
  if (e.target !== e.currentTarget) {
    const cellToMark = document.querySelector(`#${e.target.id}`);
    cellToMark.innerHTML = `<span>${playerSymbol}</span>`;
    lastMoveSymbol = cellToMark.textContent;
    moves[e.target.id[1]] = lastMoveSymbol;
    console.log('clicked on ' + e.target.id);
  }
  e.stopPropagation();
};

symbol.addEventListener('click', chooseSymbol, false);
gameField.addEventListener('click', playerMove, false);
