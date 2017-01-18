
function steamrollArray(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? steamrollArray(b) : b), []);
}


console.log(steamrollArray([[["a"]], [["b"]]]));
console.log(["a", "b"]);

console.log(steamrollArray([1, [2], [3, [[4]]]]));
console.log([1, 2, 3, 4]);

console.log(steamrollArray([1, [], [3, [[4]]]]));
console.log([1, 3, 4]);

console.log(steamrollArray([1, {}, [3, [[4]]]]));
console.log([1, {}, 3, 4]);
