
function permAlone(str) {

    var strArr = str.split("");
    var permutations = [];
    var re = /(.)\1/;

    function swap(ind1, ind2, array) {
        var tmp = array[ind1];
        array[ind1] = array[ind2];
        array[ind2] = tmp;
    }

    // Using Heap's algorithm https://en.wikipedia.org/wiki/Heap's_algorithm
    function permutate(n, arr) {
        if (n === 1)
            return permutations.push(arr.join(""));
        else {
            for (var i=0; i < n-1; i+=1) {
                permutate(n-1, arr);
                if (n % 2 === 0)
                    swap(i, n-1, arr);
                else
                    swap(0, n-1, arr);
            }
            permutate(n-1, arr);
        }
    }

    function filtr(element) {
        return !re.test(element);
    }

    permutate(strArr.length, strArr);

    return permutations.filter(filtr).length;
}

console.log(permAlone("aab"));
