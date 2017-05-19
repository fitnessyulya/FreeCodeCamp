
const playButtons = document.querySelector('.game');
const onOffToggle = document.querySelector('#toggle-label');
const strictMode = document.querySelector('#strict-status');
let gameOn = false;
let strict = false;
let pattern = [];
let count = pattern.length;

const levelUp = function levelUp() {
  const arr = ['green', 'red', 'yellow', 'blue'];
  pattern.push(arr[Math.floor(Math.random() * arr.length)]);
};

const gameSwitch = function gameSwitch() {
  gameOn = (gameOn) ? false : true;
  if (gameOn) {
    playButtons.addEventListener('mousedown', pressPlayButton, false);
    document.querySelectorAll('.play-button').forEach(button => button.classList.add('available'));
    strictMode.classList.add('available');
  } else {
    playButtons.removeEventListener('mousedown', pressPlayButton, false);
    document.querySelectorAll('.play-button').forEach(button => button.classList.remove('available'));
    strictMode.classList.remove('available');
  }
  console.log(`game switch is ${gameOn}`);
};

function play(sound) {
  const audio = document.querySelector(`#audio-${sound}`);
  if (audio) {
    audio.play();
    count += 1;
    console.log(`count now is ${count}`);
  }
}

const pressPlayButton = function pressPlayButton(e) {
  if (e.target !== e.currentTarget) {
    const button = e.target.id;
    console.log(`e.target.id is ${e.target.id}`);
    play(button);
  }
  e.stopPropagation();
};

onOffToggle.addEventListener('click', gameSwitch, false);
