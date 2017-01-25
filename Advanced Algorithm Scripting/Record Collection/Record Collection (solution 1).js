
// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
    if (value === "")
        return delete collection[id][prop];
    if (prop !== "tracks" && value !== "")
        collection[id][prop] = value;
    else if (prop === "tracks" && collection[id][prop] === undefined) {
        collection[id][prop] = [];
        collection[id][prop].push(value);
    }
    else if (prop === "tracks" && collection[id][prop] !== undefined)
        collection[id][prop].push(value);
    return collection;
}


updateRecords(5439, "artist", "ABBA");
(collection["5439"]["artist"] === "ABBA") ? console.log("...OK") : console.log("...FAIL")

updateRecords(5439, "tracks", "Take a Chance on Me");
(collection["5439"]["tracks"][collection["5439"]["tracks"].length - 1] === "Take a Chance on Me") ? console.log("...OK") : console.log("...FAIL")

updateRecords(2548, "artist", "");
(collection["2548"]["artist"] === undefined) ? console.log("...OK") : console.log("...FAIL")

updateRecords(1245, "tracks", "Addicted to Love");
(collection["1245"]["tracks"].indexOf("Addicted to Love") !== -1) ? console.log("...OK") : console.log("...FAIL")

updateRecords(2468, "tracks", "Free");
(collection["2468"]["tracks"][0] === "1999") ? console.log("...OK") : console.log("...FAIL")

updateRecords(2548, "tracks", "");
(collection["2548"]["tracks"] === undefined) ? console.log("...OK") : console.log("...FAIL")
