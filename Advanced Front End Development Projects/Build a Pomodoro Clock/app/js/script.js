
let workLength = 25;
let breakLength = 5;
const workTimerElement = document.getElementById('work-timer-element');
const breakTimerElement = document.getElementById('break-timer-element');

workTimerElement.innerHTML = workLength;
breakTimerElement.innerHTML = breakLength;

const changeWorkTime = function changeWorkTime (num) {
  if (num < 0 && workLength > 1) {
    workLength -= 1;
  } else if (num > 0) {
    workLength += 1;
  }
  workTimerElement.innerHTML = workLength;
};

const changeBreakTime = function changeBreakTime (num) {
  if (num < 0 && breakLength > 1) {
    breakLength -= 1;
  } else if (num > 0) {
    breakLength += 1;
  }
  breakTimerElement.innerHTML = breakLength;
};
