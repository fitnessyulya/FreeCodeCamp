
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
    console.log('if 1');
    input[input.length - 1] += key;
  } else if (key === '.' && /\./.test(lastInput().val)) {
  } else if (lastInput().val === '0') {
    console.log('if 2');
    input[input.length - 1] = key;
  } else if (/^\d+\.?\d*$/.test(lastInput().val)) {
    console.log('if 3');
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
    console.log(`input after splice is ${input}`);
  }

  if (reNum.test(lastInput().val)) {
    input.push(key);
    console.log(`pushed ${key}`);
  } else if (lastInput().val !== key) {
    console.log(`lastInput.val is ${lastInput().val}`);
    console.log(`lastInput.indx is ${lastInput().indx}`);
    input[lastInput().indx] = key;
      // input.splice(lastInput().index, 1, key.toString());
    console.log(`last input is ${input[lastInput.indx]}`);
  }
  console.log(`input after insertOperator is ${input}`);
};

const nextInput = function nextInput(key) {
  (key === '.') ? input.push('0.') : input.push(key);
};

const calculate = function calculate() {
  (reOperator.test(lastInput().val)) ? input.pop() : '';
  const inputString = input.reduce((acc, cur) => `${acc} ${cur}`);
  console.log(`inputString is ${inputString}`);
  result = (Function(`return ${inputString}`)()).toString();
  console.log(`result is ${result}`);
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
  console.log(key);

  if (key === 'AC') {
    allClear();
  } else if (reNum.test(key) || key === '.') {
    console.log(reNum.test(lastInput().val));

    if (reNum.test(lastInput().val)) {
      changeLastInput(key);
    } else {
      nextInput(key);
    }
  } else if (reOperator.test(key)) {
    insertOperator(key);
  } else if (key === '=') {
    console.log('about to calculate');
    calculate();
  }

  console.log(input);
  displayInput();
  console.log('after display run');
};
