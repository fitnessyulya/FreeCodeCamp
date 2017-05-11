const symbols = document.querySelector('#symbol-select');
const gameField = document.querySelector('#cells');
console.log(gameField);

let playerSymbol = '';
let computerSymbol = '';
let lastMoveSymbol = '';
let winner = '';
let moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                      [0, 3, 6], [1, 4, 7], [2, 5, 8],
                      [0, 4, 8], [2, 4, 6]];

const resetGame = function resetGame() {
  playerSymbol = '';
  computerSymbol = '';
  lastMoveSymbol = '';
  winner = '';
  moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let child of gameField.children) {
    child.style = 'none';
    child.innerHTML = '<span></span>';
  }
  for (let symbol of symbols.children) {
    symbol.style = 'none';
  }
  symbols.addEventListener('click', chooseSymbol, false);
  console.log('after reset');
};

const winDetector = function winDetector() {
  for (let trio of combinations) {
    let [x, y, z] = trio;
    if ((moves[x] === moves[y]) && (moves[y] === moves[z])) {
      winner = moves[x];
      // change background for the winning line
      for (let child of gameField.children) {
        if ((+child.id[1] === x) || (+child.id[1] === y) || (+child.id[1] === z)) {
          child.style.backgroundColor = 'yellow';
        }
      }
      break;
    }
  }
  if (winner) {
    setTimeout(resetGame, 3000);
  }
};

const markCell = function markCell(target, symbol) {
  const cellToMark = document.querySelector(`#c${target}`);
  cellToMark.innerHTML = `<span>${symbol}</span>`;
  moves[target] = symbol;
};

const firstMove = function firstMove() {
  const options = [0, 2, 6, 8];
  const target = options[Math.floor(Math.random() * options.length)];
  markCell(target, computerSymbol);
  // const cellToMark = document.querySelector(`#c${target}`);
  // cellToMark.innerHTML = `<span>${computerSymbol}</span>`;
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

// strategy for the following function from here https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
const computerMove = function computerMove() {
  // Win
  for (let trio of combinations) {
    let [x, y, z] = trio;
    let line = [moves[x], moves[y], moves[z]].filter((el, ind, arr) => {
      return ind === arr.indexOf(el);
    });
    let re = new RegExp(`^\\d,${computerSymbol}`);
    if (re.test(line.sort().toString())) {
      markCell(line.sort().toString().match(/\d/)[0], computerSymbol);
    }
  }
  // Block
  console.log(`trying to block`);
  for (let trio of combinations) {
    let [x, y, z] = trio;
    let line = [moves[x], moves[y], moves[z]].filter((el, ind, arr) => {
      return ind === arr.indexOf(el);
    });
    let re = new RegExp(`^\\d,${playerSymbol}$`);

    console.log(line);
    console.log(re.test(line.sort().toString()));
    if (re.test(line.sort().toString())) {
      console.log(`going go mark a cell`);
      markCell(line.sort().toString().match(/\d/)[0], computerSymbol);
    }
  }
  winDetector();
};

const playerMove = function playerMove(e) {
  if ((e.target !== e.currentTarget)
  && playerSymbol) {
    markCell(e.target.id[1], playerSymbol);
    // const cellToMark = document.querySelector(`#${e.target.id}`);
    // cellToMark.innerHTML = `<span>${playerSymbol}</span>`;
    // lastMoveSymbol = cellToMark.textContent;
    // moves[e.target.id[1]] = lastMoveSymbol;
    console.log('clicked on ' + e.target.id);
  }
  e.stopPropagation();
  winDetector();
  computerMove();
};

symbols.addEventListener('click', chooseSymbol, false);
gameField.addEventListener('click', playerMove, false);
