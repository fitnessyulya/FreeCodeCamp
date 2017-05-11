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

const winDetector = function winDetector2() {
  const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                        [0, 3, 6], [1, 4, 7], [2, 5, 8],
                        [0, 4, 8], [2, 4, 6]];
  for (let trio of combinations) {
    let [x, y, z] = trio;
    if ((moves[x] === moves[y]) && (moves[y] === moves[z])) {
      winner = moves[x];
      alert(`${moves[x]} won!`);
      break;
    }
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
