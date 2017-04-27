
var display = document.getElementsByClassName("display")[0];
var input = ["0"];

function lastInput () {
    return input[input.length-1];
}

function changeLastInput (key) {
    if (key === "." && !/\./.test(lastInput())) {
        console.log("if 1");
        input[input.length-1] += key;
    } else if (key === "." && /\./.test(lastInput())) {

    // }
    // else if (lastInput() === "0" && key === ".") {
    //     console.log("if 1");
    //     input[input.length-1] += key
    } else if (lastInput() === "0") {
        console.log("if 2");
        input[input.length-1] = key;
    } else if (/^\d+\.?\d*$/.test(lastInput())) {
        console.log("if 3");
        input[input.length-1] += key.toString();
    }
}

function allClear () {
    input = ["0"];
}

function displayInput () {
    display.innerHTML = lastInput();
}

function buttonClick(key) {
    console.log(key);

    var reNum = /\d/;
    // var reOperator = /+/;

    if (key == "AC") {
        allClear();
    }

    else if (reNum.test(key) || key == ".") {
        console.log(reNum.test(lastInput()));

        if (reNum.test(lastInput())) {
            changeLastInput(key);
            // lastInput = `${lastInput}${key}`;
            // lastInput() += key.toString();
        // } else { 
        //     input.push(key);
        }
    }
    console.log(input);
    displayInput();
}
