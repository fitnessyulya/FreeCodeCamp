
function pairwise(arr, arg) {

    // make a copy of an array
    var workArr = arr.slice(0);
    var indices = [];

    for (var i=0; i<arr.length; i++) {

        var first = i;

        // look for a number that is a difference of arg and first
        var second = workArr.indexOf(arg - workArr[i]);

        // if it is the same element of the array
        // then start looking from the next index
        if (second === first) 
            second = workArr.indexOf(arg - workArr[i], first+1);

        // check if not in indices already
        // and second number exists
        // add indices and delete values from the array
        if ( indices.indexOf(first)
            && indices.indexOf(second) < 0
            && second !== -1) {
                indices.push(first, second);
                delete workArr[first];
                delete workArr[second];
            }
    }

    // summ indices
    var sum = indices.reduce(function(acc, val) {
        return acc + val;
    }, 0);

    return sum;
}


if (pairwise([1, 4, 2, 3, 0, 5], 7) === 11)
    console.log("OK");
else console.log("FAIL");

if (pairwise([1, 3, 2, 4], 4) === 1)
    console.log("OK");
else console.log("FAIL");

if (pairwise([1, 1, 1], 2) === 1)
    console.log("OK");
else console.log("FAIL");

if (pairwise([0, 0, 0, 0, 1, 1], 1) === 10)
    console.log("OK");
else console.log("FAIL");

if (pairwise([], 100) === 0)
    console.log("OK");
else console.log("FAIL");