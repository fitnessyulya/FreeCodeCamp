
const display = document.getElementsByClassName('display')[0];
let input = ['0'];
let result = '';
const reOperator = /[/*+-]/;
const reNum = /\d/;

const allClear = function allClear() {
  input = ['0'];
  result = '';
};

const lastInput = function lastInput() {
  return { val: input[input.length - 1],
    indx: input.length - 1 };
};

const changeLastInput = function changeLastInput(key) {
  (result) ? allClear() : '';
  if (key === '.' && !/\./.test(lastInput().val)) {
    input[input.length - 1] += key;
  } else if (key === '.' && /\./.test(lastInput().val)) {
  } else if (lastInput().val === '0') {
    input[input.length - 1] = key;
  } else if (/^\d+\.?\d*$/.test(lastInput().val)) {
    input[input.length - 1] += key.toString();
  }
};

const insertOperator = function insertOperator(key) {
  if (result === 'LIMIT') {
    input = [];
    result = '';
  }

  if (result) {
    input.splice(0, input.length, result);
    result = '';
  }

  if (reNum.test(lastInput().val)) {
    input.push(key);
  } else if (lastInput().val !== key) {
    input[lastInput().indx] = key;
  }
};

const nextInput = function nextInput(key) {
  (key === '.') ? input.push('0.') : input.push(key);
};

const calculate = function calculate() {
  (reOperator.test(lastInput().val)) ? input.pop() : '';
  const inputString = input.reduce((acc, cur) => `${acc} ${cur}`);
  result = (Function(`return ${inputString}`)()).toString();
};

const displayLimit = function displayLimit() {
  if ((result || lastInput().val).length > 10) {
    return true;
  }
};

const roundFloat = function roundFloat() {
  return Number(result).toFixed(2);
};

const checkLimit = function checkLimit() {
  if ((result % 1 !== 0) && (roundFloat().length < 10)) {
    result = roundFloat();
  } else if (displayLimit()) {
    result = 'LIMIT';
  }
};

const displayInput = function displayInput() {
  checkLimit();

  if (result) {
    display.innerHTML = result;
  } else if (reNum.test(lastInput().val)) {
    display.innerHTML = lastInput().val;
  }
};

const buttonClick = function buttonClick(key) {

  if (key === 'AC') {
    allClear();
  } else if (reNum.test(key) || key === '.') {

    if (reNum.test(lastInput().val)) {
      changeLastInput(key);
    } else {
      nextInput(key);
    }
  } else if (reOperator.test(key)) {
    insertOperator(key);
  } else if (key === '=') {
    calculate();
  }

  displayInput();
};
