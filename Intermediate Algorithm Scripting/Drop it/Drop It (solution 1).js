
function dropElements(arr, func) {
    return (arr.find(func)) ? arr.slice(arr.indexOf(arr.find(func))) : [];
}

console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3;}));
console.log([3, 4]);

console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));
console.log([1, 0, 1]);

console.log(dropElements([1, 2, 3], function(n) {return n > 0;}));
console.log([1, 2, 3]);

console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5;}));
console.log([]);

console.log(dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;}));
console.log([7, 4]);

console.log(dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}));
console.log([3, 9, 2]);
