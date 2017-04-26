
var display = document.getElementsByClassName("display")[0];
// console.log(display);
var input = [];

function buttonClick(key) {
    console.log(key);
    var reNum = /\d/;
    // var reOperator = /+/;
    if (reNum.test(key)) {
        display.innerHTML = key;
    }
}
