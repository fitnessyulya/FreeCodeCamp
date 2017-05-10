const symbols = document.querySelector('#symbol-select');
const gameField = document.querySelector('#cells');
console.log(gameField);

let playerSymbol = '';
let computerSymbol = '';
let lastMoveSymbol = '';
let winner = '';
let moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const resetGame = function resetGame() {
  playerSymbol = '';
  computerSymbol = '';
  lastMoveSymbol = '';
  winner = '';
  moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let child of gameField.children) {
    child.innerHTML = '<span></span>';
  }
  for (let symbol of symbols.children) {
    symbol.style = 'none';
  }
  symbols.addEventListener('click', chooseSymbol, false);
  console.log('after reset');
};

const winDetector = function winDetector() {
  const horizontal = [0, 1, 2];
  const vertical = [0, 3, 6];
  const diagonal = [0, 4, 8];

  switch (true) {
    case (moves[0] === moves[1]) && (moves[1] === moves[2]):
      winner = moves[0];
      alert(`${moves[0]} won!`);
      break;
    case (moves[3] === moves[4]) && (moves[4] === moves[5]):
      winner = moves[3];
      alert(`${moves[3]} won!`);
      break;
    case (moves[6] === moves[7]) && (moves[7] === moves[8]):
      winner = moves[6];
      alert(`${moves[6]} won!`);
      break;
    case (moves[0] === moves[3]) && (moves[3] === moves[6]):
      winner = moves[0];
      alert(`${moves[0]} won!`);
      break;
    case (moves[1] === moves[4]) && (moves[4] === moves[7]):
      winner = moves[1];
      alert(`${moves[1]} won!`);
      break;
    case (moves[2] === moves[5]) && (moves[5] === moves[8]):
      winner = moves[2];
      alert(`${moves[2]} won!`);
      break;
    case (moves[0] === moves[4]) && (moves[4] === moves[8]):
      winner = moves[0];
      alert(`${moves[0]} won!`);
      break;
    case (moves[2] === moves[4]) && (moves[4] === moves[6]):
      winner = moves[2];
      alert(`${moves[2]} won!`);
      break;
  }
  if (winner) {
    setTimeout(resetGame, 3000);
  }
};

const firstMove = function firstMove() {
  const options = [0, 2, 6, 8];
  const target = options[Math.floor(Math.random() * options.length)];
  const cellToMark = document.querySelector(`#c${target}`);
  cellToMark.innerHTML = `<span>${computerSymbol}</span>`;
};

const chooseSymbol = function chooseSymbol(e) {
  if (e.target !== e.currentTarget) {
    const choice = e.target.textContent;
    e.target.style.backgroundColor = 'yellow';
    playerSymbol = (choice === 'X') ? 'X' : 'O';
    computerSymbol = (playerSymbol === 'X') ? 'O' : 'X';
    symbols.removeEventListener('click', chooseSymbol, false);
    console.log(choice);
  }
  e.stopPropagation();
  if (computerSymbol === 'X') {
    firstMove();
  }
};

const playerMove = function playerMove(e) {
  if ((e.target !== e.currentTarget)
  && playerSymbol) {
    const cellToMark = document.querySelector(`#${e.target.id}`);
    cellToMark.innerHTML = `<span>${playerSymbol}</span>`;
    lastMoveSymbol = cellToMark.textContent;
    moves[e.target.id[1]] = lastMoveSymbol;
    console.log('clicked on ' + e.target.id);
  }
  e.stopPropagation();
  winDetector();
};

symbols.addEventListener('click', chooseSymbol, false);
gameField.addEventListener('click', playerMove, false);
