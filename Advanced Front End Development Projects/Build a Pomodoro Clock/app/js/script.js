
let workLength = 25;
let breakLength = 5;


const changeWorkTime = function changeWorkTime (num) {
  if (num < 0 && workLength > 1) {
    workLength -= 1;
  } else if (num > 0) {
    workLength += 1;
  }
};

const changeBreakTime = function changeBreakTime (num) {
  if (num < 0 && breakLength > 1) {
    breakLength -= 1;
  } else if (num > 0) {
    breakLength += 1;
  }
};
