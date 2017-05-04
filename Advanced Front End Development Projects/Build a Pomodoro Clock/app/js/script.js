
const session = {
  workLength: 25,
  breakLength: 5,
  status: 0,
};
const workTimerElement = document.getElementById('work-timer-element');
const breakTimerElement = document.getElementById('break-timer-element');
const timerControl = document.getElementById('timer-control');

workTimerElement.innerHTML = session.workLength;
breakTimerElement.innerHTML = session.breakLength;

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

const runSession = function runSession() {
  console.log(session.breakLength);
};

timerControl.onclick = function () {
  if (!session.status) {
    session.timer = setInterval(runSession, 1000);
    session.status = 'running';
    timerControl.innerText = 'pause';
  } else if (session.status === 'paused') {
    session.status = 'continued';
    timerControl.innerText = 'pause';
  } else {
    session.status = 'paused';
    timerControl.innerText = 'continue';
  }
};
// timerControl.addEventListener('click', setInterval(runSession, 1000));
