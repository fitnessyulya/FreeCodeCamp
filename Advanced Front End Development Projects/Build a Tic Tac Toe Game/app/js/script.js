let playerSymbol = 'O';
let computerSymbol = 'X';
let lastMoveSymbol = '';

const gameField = document.querySelector('#cells');

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

gameField.addEventListener('click', playerMove, false);
