
const playButtons = document.querySelector('.game');
const onOffToggle = document.querySelector('#toggle-label');
let gameOn = false;

const gameSwitch = function gameSwitch() {
  gameOn = (gameOn) ? false : true;
  console.log(`game switch is ${gameOn}`);
};

function play(sound) {
  const audio = document.querySelector(`#audio-${sound}`);
  if (audio) audio.play();
}

const pressPlayButton = function pressPlayButton(e) {
  if (e.target !== e.currentTarget) {
    const button = e.target.id;
    console.log(`e.target.id is ${e.target.id}`);
    play(button);
  }
  e.stopPropagation();
};

playButtons.addEventListener('mousedown', pressPlayButton, false);
onOffToggle.addEventListener('click', gameSwitch, false);
