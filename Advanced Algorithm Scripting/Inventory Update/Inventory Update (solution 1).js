
function updateInventory(arr1, arr2) {

    var curInv = arr1.slice();
    var newInv = arr2.slice();

    var toSort = function (array) {
        return array.sort((a, b) => {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0;
        });
    };

    if (!curInv.length) return toSort(newInv);

    for (var i=0; i<arr2.length; i++) {
        for (var j=0; j<arr1.length; j++) {
            if (arr2[i][1] === arr1[j][1]) {
                curInv[j][0] += arr2[i][0];
                i++; j=0;
                continue;
            }
            if (j===arr1.length-1)
                curInv = curInv.concat([arr2[i]]);
        }
    }
    return toSort(curInv);
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];


// updateInventory(curInv, newInv);
console.log( updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) );




// TESTS

// test 1
if (Array.isArray(updateInventory(curInv, newInv)))
    console.log("test 1 ... OK");
else
    console.log("test 1 ... FAILED: should return an array");

// test 2
(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]).length === 6) ? console.log("test 2 ... OK") : console.log("test 2 ... FAIL: should return an array with a length of 6. " + curInv.length + " instead");

// // test 3
// (typeof checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "string") ? console.log("test 3 ... OK") : console.log("FAIL: must be a string");

// // test 4
// var test4 = [["QUARTER", 0.50]];
// if (checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]).every( (element, index) => {
//     return element[0] === test4[index][0] && element[1] === test4[index][1];
// }))
//     console.log("test 4 ... OK");
// else
//     console.log("test 4 ... FAILED");

// // test 6
// (checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "Insufficient Funds") ? console.log("test 6 ... OK") : console.log('test 6 ... FAILED: must be "Insufficient Funds"');

// // test 7
// (checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "Insufficient Funds") ? console.log("test 7 ... OK") : console.log('test 7 ... FAILED: must be "Insufficient Funds"');

// // test 8
// (checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === "Closed") ? console.log("test 8 ... OK") : console.log('test 8 ... FAILED: must be "Closed"');
