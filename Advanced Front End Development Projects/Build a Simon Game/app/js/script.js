
const playButtons = document.querySelector('.game');
const startButton = document.querySelector('#start-button');
const strictMode = document.querySelector('#strict-status');
const strictButton = document.querySelector('#strict-mode-label');
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

const display = function display(info) {
  console.log(`display info is ${info}`);
  let infoStr = info.toString();
  if (/\d/.test(infoStr) && infoStr.length === 1) {
    infoStr = `0${infoStr}`;
  }
  document.querySelector('#display-info').textContent = infoStr;
};

const strictSwitch = function strictSwitch() {
  if (strict) {
    strict = false;
  } else {
    strict = true;
  }
  console.log(`strict now is ${strict}`);
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
    playButtons.addEventListener('touchstart', pressColorButton, false);
    playButtons.addEventListener('mouseup', releaseColorButton, false);
    playButtons.addEventListener('touchend', releaseColorButton, false);
    playButtons.addEventListener('click', checkMove, false);
    startButton.addEventListener('click', start, false);
    strictButton.addEventListener('click', strictSwitch, true);
    document.querySelectorAll('.play-button').forEach(button => button.classList.add('available'));
    strictMode.classList.add('available');
    display('--');
  } else {
    playButtons.removeEventListener('mousedown', pressColorButton, false);
    playButtons.removeEventListener('mouseup', pressColorButton, false);
    playButtons.removeEventListener('touchstart', pressColorButton, false);
    playButtons.removeEventListener('touchend', pressColorButton, false);
    playButtons.removeEventListener('click', checkMove, false);
    startButton.removeEventListener('click', start, false);
    strictButton.removeEventListener('click', strictSwitch, true);
    document.querySelectorAll('.play-button').forEach(button => button.classList.remove('available'));
    strictMode.classList.remove('available');
    display('');
    resetGame();
  }
  console.log(`game switch is ${gameOn}`);
};

const gamePlay = function gamePlay() {
  display(pattern.length);

  for (const [index, button] of pattern.entries()) {
    setTimeout(() => {
      // playButtons.removeEventListener('mousedown', pressColorButton, false);
      // playButtons.removeEventListener('mouseup', releaseColorButton, false);
      // playButtons.removeEventListener('click', checkMove, false);
      console.log(`${button} was pressed by gamePlay function`);
      setTimeout(() => {
        document.querySelector(`#${button}`).classList.add('active');
        playSound(button);
      }, (index * 900));
      setTimeout(() => {
        document.querySelector(`#${button}`).classList.remove('active');
      }, (index + 1) * 900);
      // playButtons.addEventListener('mousedown', pressColorButton, false);
      // playButtons.addEventListener('mouseup', releaseColorButton, false);
      // playButtons.addEventListener('click', checkMove, false);
    }, (index + 1) * 200);
  }
};

const checkMove = function checkMove(e) {
  if ((e.target.id === 'green'
  || e.target.id === 'red'
  || e.target.id === 'yellow'
  || e.target.id === 'blue') && pattern.length) {
    if (e.target.id === pattern[playerMoves.length]) {
      playerMoves.push(e.target.id);
      if (pattern.length === playerMoves.length) {
        if (pattern.length === 20) {
          alert('You are the winner!');
          display('--');
          setTimeout(() => {
            start();
          }, 1200);
        } else {
          playerMoves = [];
          display('OK');
          setTimeout(() => {
            continueGame();
          }, 1200);
        }
      }
    } else {
      display('NO');
      setTimeout(() => {
        (strict) ? start() : gamePlay();
      }, 1200);
    }
  }
};

const start = function start() {
  resetGame();
  levelUp();
  display(pattern.length);
  gamePlay();
  console.log('game started');
};

const continueGame = function continueGame() {
  levelUp();
  gamePlay();
};

onOffToggle.addEventListener('click', turnOnGame, false);
