// jshint esversion:6

function pairwise(arr, arg) {
    var workArr = arr.slice(0); // a copy of input array
    var indexArr = []; // empty array for indices

    workArr.forEach(function(firstN, ind1, array) { // grab a single number (firstN)
        for (var ind2=0; ind2< workArr.length; ind2++) { // loop all entries from the array against firstN
            var secondN = array[ind2];
            if (firstN + secondN === arg
                && ind1 !== ind2) { // disallow same number use
                indexArr.push(ind1, ind2);
                delete array[ind1]; // clean up after myself
                delete array[ind2];
                break; // escapes for loop to avoid negative indices
      }
    };
  });

    return indexArr.reduce( (c, n) => {return c + n;}, 0 );
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
