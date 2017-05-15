const symbols = document.querySelector('#symbol-select');
const gameField = document.querySelector('#cells');
console.log(symbols.children);

let playerSymbol = '';
let computerSymbol = '';
let opening = '';
let lastMoveSymbol = '';
let winner = '';
let moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                      [0, 3, 6], [1, 4, 7], [2, 5, 8],
                      [0, 4, 8], [2, 4, 6]];

const resetGame = function resetGame() {
  playerSymbol = '';
  computerSymbol = '';
  opening = '';
  lastMoveSymbol = '';
  winner = '';
  moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  console.log('resetting game, before for loop');
  for (let child of gameField.children) {
    console.log('in reset for loop');
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
        if ((+child.id[1] === x) || (+child.id[1] === y) || (+child.id[1] === z))
          child.style.backgroundColor = 'red';
      }
      break;
    }
  }
  if (winner || !/\d/.test(moves.toString())) {
    console.log('going to clear cells');
    setTimeout(resetGame, 3000);
  }
};

const markCell = function markCell(target, symbol) {
  if (lastMoveSymbol !== symbol) {
    const cellToMark = document.querySelector(`#c${target}`);
    cellToMark.innerHTML = `<span>${symbol}</span>`;
    moves[target] = symbol;
    lastMoveSymbol = symbol;
  }
};

const chooseSymbol = function chooseSymbol(e) {
  if (e.target !== e.currentTarget) {
    const choice = e.target.textContent;
    e.target.style.backgroundColor = 'yellow';
    playerSymbol = (choice === 'X') ? 'X' : 'O';
    computerSymbol = (playerSymbol === 'X') ? 'O' : 'X';
    symbols.removeEventListener('click', chooseSymbol, false);
    console.log(`player chose ${choice}`);
  }
  e.stopPropagation();
  computerMove();
};

const randomSelect = function randomSelect(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// strategy for the following function from here https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
const computerMove = function computerMove() {
  const corners = [0, 2, 6, 8];
  const cornerPairs = [[0, 8], [2, 6]];
  const edges = [1, 3, 5, 7];
  const edgePairs = [[1, 3], [1, 5], [3, 7], [5, 7]];
  const center = 4;
  const targetCorner = randomSelect(randomSelect(cornerPairs));
  // Opening
  if (computerSymbol === 'X'
  && moves.indexOf(computerSymbol) < 0
  && !opening) {
    console.log('opening computerSymbol X');
    markCell(targetCorner, computerSymbol);
    opening = 'done';
    return;
  } else if (moves.indexOf(playerSymbol) >= 0
  && moves.indexOf(playerSymbol, moves.indexOf(playerSymbol) + 1) === -1
  && !opening) {
    console.log('inside opening, computerSymbol is O');
    const firstX = moves.indexOf('X');
    if (firstX === center) {
      console.log('opening X in a center');
      markCell(targetCorner, computerSymbol);
    } else if (corners.indexOf(firstX) >= 0) {
      console.log('opening X in a corner');
      markCell(center, computerSymbol);
    } else {
      console.log('opening X in an edge');
      markCell(center, computerSymbol);
    }
    opening = 'done';
  }
  if (opening && !winner) {
    // Win
    for (let trio of combinations) {
      let [x, y, z] = trio;
      let line = [moves[x], moves[y], moves[z]].filter((el, ind, arr) => {
        return ind === arr.indexOf(el);
      });
      let re = new RegExp(`^\\d,${computerSymbol}$`);
      if (re.test(line.sort().toString())) {
        console.log('win');
        markCell(line.sort().toString().match(/\d/)[0], computerSymbol);
      }
    }
    // Block
    for (let trio of combinations) {
      let [x, y, z] = trio;
      let line = [moves[x], moves[y], moves[z]].filter((el, ind, arr) => {
        return ind === arr.indexOf(el);
      });
      let re = new RegExp(`^\\d,${playerSymbol}$`);
      if (re.test(line.sort().toString())) {
        console.log('blocked');
        markCell(line.sort().toString().match(/\d/)[0], computerSymbol);
      }
    }
    // Fork
    for (let duo of cornerPairs) {
      let [x, y] = duo;
      let oppositCorners = [moves[x], moves[y]].filter((el) => {
        return el !== computerSymbol;
      });
      console.log(oppositCorners);
      if (oppositCorners.length === 1 && /\d/.test(oppositCorners)) {
        markCell(oppositCorners[0], computerSymbol);
        console.log('forked step 1');
      }
    }
    let fork = moves.reduce((acc, cur, ind) => {
      return (cur === playerSymbol) ? acc.concat(ind) : acc;
    }, []);
    console.log(`fork is ${fork}`);

    if (fork.length === 2) {
      for (const [ind, pair] of edgePairs.entries()) {
        if (pair.indexOf(fork[0]) >= 0
        && pair.indexOf(fork[1]) >= 0) {
          markCell(corners[ind], computerSymbol);
          console.log(`prevent corner fork ${pair}`);
        }
      }
    }

    // Blocking an opponent's fork
    for (let trio of combinations.slice(-2)) {
      let [x, y, z] = trio;
      let oneInLine = [moves[x], moves[y], moves[z]];
      let re = new RegExp(`^${computerSymbol},${playerSymbol},${playerSymbol}$`);

      if (re.test(oneInLine.sort().toString())) {
        const ind = trio[oneInLine.indexOf(`${computerSymbol}`)];
        if (cornerPairs[0].indexOf(ind) >= 0) {
          const corner = randomSelect(cornerPairs[1]);
          if (/\d/.test(moves[corner])) {
            console.log('blocked an opponent\'s fork if');
            markCell(corner, computerSymbol);
          }
        } else if (cornerPairs[1].indexOf(ind) >= 0) {
          const corner = randomSelect(cornerPairs[0]);
          if (/\d/.test(moves[corner])) {
            markCell(randomSelect(cornerPairs[0]), computerSymbol);
            console.log('blocked an opponent\'s fork else');
          }
        }
      }
    }

    // Empty side
    for (let cell of edges) {
      if (/\d/.test(moves[cell])) {
        markCell(cell, computerSymbol);
        console.log(`marked an empty side cell ${cell}`);
      }
    }
  }
  winDetector();
};

const playerMove = function playerMove(e) {
  if ((e.target !== e.currentTarget)
  && /\d/.test(moves[e.target.id[1]])
  && playerSymbol) {
    // console.log(`e.target is ${e.target}`);
    markCell(e.target.id[1], playerSymbol);
    // console.log('clicked on ' + e.target.id);
  }
  e.stopPropagation();
  winDetector();
  computerMove();
};

symbols.addEventListener('click', chooseSymbol, false);
gameField.addEventListener('click', playerMove, false);
