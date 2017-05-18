
const onOffToggle = document.querySelector('#toggle-label');
let gameOn = false;

const gameSwitch = function gameSwitch() {
  if (gameOn) {
    gameOn = false;
  } else {
    gameOn = true;
  }
  console.log(gameOn);
};

onOffToggle.addEventListener('click', gameSwitch, false);
