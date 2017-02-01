
function checkCashRegister(price, cash, cid) {
    var bills = {"PENNY": 0.01,
                "NICKEL": 0.05,
                "DIME": 0.10,
                "QUARTER": 0.25,
                "ONE": 1,
                "FIVE": 5,
                "TEN": 10,
                "TWENTY": 20,
                "ONE HUNDRED": 100};

    var total = function(array) {
        if (array.length === 0) return 0;
        var result = 0;
        for (element in array) {
            result += array[element][1] * 100 /* to avoid decimal problem */;
        }
    return result / 100 /* to avoid decimal problem */;
    };

    var totalChange = cash - price;
    var change = [];

    if (total(cid) === totalChange)
        return "Closed";

    for (var i = cid.length-1; i >= 0; i--) {
        var calcChange = (totalChange * 100 - total(change) * 100) / 100 /* to avoid decimal problem */;
        var bill = bills[cid[i][0]];
        var numOfBills = Math.floor(calcChange / bills[cid[i][0]]);
        if (numOfBills && cid[i][1]) {
            if (cid[i][1] > numOfBills * bill)
                change.push([cid[i][0], (Math.floor(calcChange / bill) * bill)]);
            else
                change.push([cid[i][0], cid[i][1]]);
        }
    }

    if (total(change) === totalChange)
        return change;
    else if (total(change) < totalChange)
        return "Insufficient Funds";
    else
        console.log("ERROR");
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]


// TESTS

// test 1
if (Array.isArray(checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])))
    console.log("test 1 ... OK");
else
    console.log("test 1 ... FAILED: must be type \"array\"");

// test 2
(typeof checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "string") ? console.log("test 2 ... OK") : console.log("FAIL: must be a string");

// test 3
(typeof checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "string") ? console.log("test 3 ... OK") : console.log("FAIL: must be a string");

// test 4
var test4 = [["QUARTER", 0.50]];
if (checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]).every( (element, index) => {
    return element[0] === test4[index][0] && element[1] === test4[index][1];
}))
    console.log("test 4 ... OK");
else
    console.log("test 4 ... FAILED");

// test 5
var test5 = [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]];
if (checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]).every( (element, index) => {
    return element[0] === test5[index][0] && element[1] === test5[index][1];
}))
    console.log("test 5 ... OK");
else
    console.log("test 5 ... FAILED");

// test 6
(checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "Insufficient Funds") ? console.log("test 6 ... OK") : console.log('test 6 ... FAILED: must be "Insufficient Funds"');

// test 7
(checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "Insufficient Funds") ? console.log("test 7 ... OK") : console.log('test 7 ... FAILED: must be "Insufficient Funds"');

// test 8
(checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "Closed") ? console.log("test 8 ... OK") : console.log('test 8 ... FAILED: must be "Closed"');
