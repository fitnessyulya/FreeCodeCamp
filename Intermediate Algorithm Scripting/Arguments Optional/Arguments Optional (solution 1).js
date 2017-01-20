
function addTogether() {

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== "number") 
            return undefined;
    }

    if (arguments.length == 1) {
        var a = arguments[0];
        return function(b) {
            return (typeof b !== "number") ? undefined :  a + b;
        };
    }

    if (arguments.length > 1) {
        return arguments[0] + arguments[1];
    } else {
        return undefined;
    }
}


console.log(addTogether(2, 3));
console.log(5);

console.log(addTogether(2)(3));
console.log(5);

console.log(addTogether("http://bit.ly/IqT6zt"));
console.log(undefined);

console.log(addTogether(2, "3"));
console.log(undefined);

console.log(addTogether(2)([3]));
console.log(undefined);
