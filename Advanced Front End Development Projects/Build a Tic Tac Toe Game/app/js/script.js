const symbol = document.querySelector('#symbol-select');
const gameField = document.querySelector('#cells');

let playerSymbol = '';
let computerSymbol = '';
let lastMoveSymbol = '';

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
    const clickedCell = e.target.id;
    const cellToMark = document.querySelector(`#${clickedCell}`);
    cellToMark.innerHTML = `<span>${playerSymbol}</span>`;
    lastMoveSymbol = cellToMark.textContent;
    console.log('clicked on ' + clickedCell);
  }
  e.stopPropagation();
};

symbol.addEventListener('click', chooseSymbol, false);
gameField.addEventListener('click', playerMove, false);
