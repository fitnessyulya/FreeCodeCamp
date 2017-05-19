
const playButtons = document.querySelector('.game');
const startButton = document.querySelector('#start-button');
const strictMode = document.querySelector('#strict-status');
const onOffToggle = document.querySelector('#toggle-label');
let gameOn = false;
let strict = false;
let pattern = [];
let count = pattern.length;

const resetGame = function resetGame() {
  pattern = [];
  console.log('game is reset');
};

const levelUp = function levelUp() {
  const arr = ['green', 'red', 'yellow', 'blue'];
  pattern.push(arr[Math.floor(Math.random() * arr.length)]);
  console.log(`leveled up, pattern is ${pattern}`);
};

const start = function start() {
  resetGame();
  levelUp();
  console.log('game started');
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
    const button = e.target.id;
    console.log(`e.target.id is ${e.target.id}`);
    document.querySelector(`#${button}`).classList.add('active');
    playSound(button);
  }
  e.stopPropagation();
};

const releaseColorButton = function releaseColorButton(e) {
  if (e.target !== e.currentTarget) {
    const button = e.target.id;
    document.querySelector(`#${button}`).classList.remove('active');
  }
  e.stopPropagation();
};

const turnOnGame = function turnOnGame() {
  gameOn = (gameOn) ? false : true;
  if (gameOn) {
    playButtons.addEventListener('mousedown', pressColorButton, false);
    playButtons.addEventListener('mouseup', releaseColorButton, false);
    startButton.addEventListener('click', start, false);
    document.querySelectorAll('.play-button').forEach(button => button.classList.add('available'));
    strictMode.classList.add('available');
  } else {
    playButtons.removeEventListener('mousedown', pressColorButton, false);
    startButton.removeEventListener('click', start, false);
    document.querySelectorAll('.play-button').forEach(button => button.classList.remove('available'));
    strictMode.classList.remove('available');
  }
  console.log(`game switch is ${gameOn}`);
};

// const gamePlay = function gamePlay() {
//   pattern.forEach(button => {

//   });
// };

onOffToggle.addEventListener('click', turnOnGame, false);
