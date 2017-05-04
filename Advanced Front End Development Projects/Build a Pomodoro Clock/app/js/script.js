
let session = {
  workLength: 25,
  breakLength: 5,
};
const workTimerElement = document.getElementById('work-timer-element');
const breakTimerElement = document.getElementById('break-timer-element');
const timerControl = document.getElementById('timer-control');

workTimerElement.innerHTML = session.workLength;
breakTimerElement.innerHTML = session.breakLength;
// timerControl.addEventListener('click', timer )

const applySessionChange = function applySessionChange(num, timerType) {
  if (num < 0 && session[timerType] > 1) {
    session[timerType] -= 1;
  } else if (num > 0) {
    session[timerType] += 1;
  }
};

const changeWorkTime = function changeWorkTime(num, timerType = 'workLength') {
  applySessionChange(num, timerType);
  workTimerElement.innerHTML = session.workLength;
};

const changeBreakTime = function changeBreakTime(num, timerType = 'breakLength') {
  applySessionChange(num, timerType);
  breakTimerElement.innerHTML = session.breakLength;
};

const pokeSession = function pokeSession () {

}
