
function Person (firstAndLast) {
    var pFull = firstAndLast.split(" ");

    this.getFirstName = function() {return pFull[0];};
    this.getLastName = function() {return pFull[1];};
    this.getFullName = function() {return pFull.join(" ");};

    this.setFirstName = function(first) {pFull[0] = first;};
    this.setLastName = function(last) {pFull[1] = last;};
    this.setFullName = function(firstAndLast) {pFull = firstAndLast.split(" ");};
}

var bob = new Person('Bob Ross');
