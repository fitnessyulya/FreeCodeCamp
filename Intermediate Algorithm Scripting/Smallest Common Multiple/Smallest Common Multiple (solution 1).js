
function smallestCommons(arr) {
    arr.sort();
    var result;

    var fullArr = [];
    for (var i = arr[0], j = arr[1]; i <= j; i++)
        fullArr.push(i);

    function canBeDivided(number, array) {
        for (var e = array[0]; e <= array[array.length-1]; e++) {
            if (number % e !== 0) {
                return true;
            }
        }
        return false;
    }
    
    var candidate = arr[1];
    while (canBeDivided(candidate, arr)) {
        candidate++;
    }

    return candidate;
}


console.log(smallestCommons([1, 5]));
console.log(60);

console.log(smallestCommons([5, 1]));
console.log(60);

console.log(smallestCommons([1, 13]));
console.log(360360);

console.log(smallestCommons([23, 18]));
console.log(6056820);
