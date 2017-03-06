
function sym(args) {
    var argsArray  = [].slice.call(arguments);
    // deduplicated argsArray
    var dedArgsArray = [];
    // var args_array2 = [...arguments]; // ES6

    // get rid of repetitions in all arguments
    argsArray.forEach((element) => {
        dedArgsArray.push(element.reduce((acc, cur, ind, arr) => {
            return (acc.indexOf(cur) === -1) ? acc.concat(cur) : acc;
        }, []));
    });

    // take 2 arrays from dedArgsArray and return symmetric difference
    var symmDiff = function() { 
        return dedArgsArray[1].reduce(function(acc, cur){
            if (acc.indexOf(cur) > -1) {
                acc.splice(acc.indexOf(cur), 1);
                return acc;
            } else {
                acc.push(cur);
                return acc;
            }
        }, dedArgsArray[0]);
    };

    // while there are more than 1 element in dedArgsArray
    while (dedArgsArray.length > 1) {
        let result = symmDiff();
        // replace 2 arrays with symmetric difference
        dedArgsArray.splice(0, 2, result);
    }

    // return index 0 because we have array-in-array
    return dedArgsArray[0].sort((a,b) => a - b);
}


console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log([3, 4, 5]);

console.log((sym([1, 2, 3], [5, 2, 1, 4])).length);
console.log(3);

console.log(sym([1, 2, 3], [5, 2, 1, 4]));
console.log([1, 4, 5]);

console.log((sym([1, 2, 5], [2, 3, 5], [3, 4, 5])).length);
console.log(3);

console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));
console.log([1, 4, 5]);

console.log((sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])).length);
console.log(3);

console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]));
console.log([2, 3, 4, 6, 7]);

console.log((sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])).length);
console.log(5);

console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));
console.log([1, 2, 4, 5, 6, 7, 8, 9]);

console.log((sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])).length);
console.log(8);
