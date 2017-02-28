
function orbitalPeriod(arr) {
    var workArr = arr.slice(0);
    var GM = 398600.4418;
    var earthRadius = 6367.4447;

    workArr.forEach(function(element) {
        var calcs = 2 * Math.PI * (Math.sqrt(
          Math.pow(earthRadius + element.avgAlt, 3) / GM));
        element.orbitalPeriod = Math.round(calcs);
        delete element.avgAlt;
    });
    return workArr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
