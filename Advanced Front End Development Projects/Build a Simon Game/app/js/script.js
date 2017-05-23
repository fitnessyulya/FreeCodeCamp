
const playButtons = document.querySelector('.game');
const startButton = document.querySelector('#start-button');
const strictMode = document.querySelector('#strict-status');
const onOffToggle = document.querySelector('#toggle-label');
let gameOn = false;
let strict = false;
let pattern = [];
let playerMoves = [];
let count = pattern.length;

const resetGame = function resetGame() {
  pattern = [];
  playerMoves = [];
  console.log('game is reset');
};

const levelUp = function levelUp() {
  const arr = ['green', 'red', 'yellow', 'blue'];
  pattern.push(arr[Math.floor(Math.random() * arr.length)]);
  console.log(`leveled up, pattern is ${pattern}`);
};

const playSound = function playSound(sound) {
  const audio = document.querySelector(`#audio-${sound}`);
  if (audio) {
    audio.play();
    count += 1;
    console.log(`count now is ${count}`);
  }
};

const pressColorButton = function pressColorButton(e) {
  if (e.target !== e.currentTarget) {
    const buttonId = e.target.id;
    console.log(`e.target.id is ${e.target.id}`);
    document.querySelector(`#${buttonId}`).classList.add('active');
    playSound(buttonId);
  }
  e.stopPropagation();
};

const releaseColorButton = function releaseColorButton(e) {
  if (e.target !== e.currentTarget) {
    const buttonId = e.target.id;
    document.querySelector(`#${buttonId}`).classList.remove('active');
  }
  e.stopPropagation();
};

const turnOnGame = function turnOnGame() {
  gameOn = (gameOn) ? false : true;
  if (gameOn) {
    playButtons.addEventListener('mousedown', pressColorButton, false);
    playButtons.addEventListener('mouseup', releaseColorButton, false);
    playButtons.addEventListener('click', checkMove, false);
    startButton.addEventListener('click', start, false);
    document.querySelectorAll('.play-button').forEach(button => button.classList.add('available'));
    strictMode.classList.add('available');
  } else {
    playButtons.removeEventListener('mousedown', pressColorButton, false);
    playButtons.removeEventListener('click', checkMove, false);
    startButton.removeEventListener('click', start, false);
    document.querySelectorAll('.play-button').forEach(button => button.classList.remove('available'));
    strictMode.classList.remove('available');
  }
  console.log(`game switch is ${gameOn}`);
};

const gamePlay = function gamePlay() {
  playButtons.removeEventListener('mousedown', pressColorButton, false);
  playButtons.removeEventListener('click', checkMove, false);

  for (const [index, button] of pattern.entries()) {
    setTimeout(() => {
      console.log(`${button} was pressed by gamePlay function`);
      setTimeout(() => {
        document.querySelector(`#${button}`).classList.add('active');
        playSound(button);
      }, (index * 900));
      setTimeout(() => {
        document.querySelector(`#${button}`).classList.remove('active');
      }, (index + 1) * 900);
    }, (index + 1) * 200);
  }
  playButtons.addEventListener('mousedown', pressColorButton, false);
  // playButtons.addEventListener('mouseup', releaseColorButton, false);
  playButtons.addEventListener('click', checkMove, false);
};

const checkMove = function checkMove(e) {
  if (e.target.id === 'green'
  || e.target.id === 'red'
  || e.target.id === 'yellow'
  || e.target.id === 'blue') {
    if (e.target.id === pattern[playerMoves.length]) {
      playerMoves.push(e.target.id);
      if (pattern.length === playerMoves.length) {
        playerMoves = [];
        setTimeout(() => {
          continueGame();
        }, 1200);
      }
    } else {
      // function display error
      gamePlay();
    }
  }
};

const start = function start() {
  resetGame();
  levelUp();
  gamePlay();
  console.log('game started');
};

const continueGame = function continueGame() {
  levelUp();
  gamePlay();
};

onOffToggle.addEventListener('click', turnOnGame, false);
