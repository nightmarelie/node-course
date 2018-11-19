let fs = require("fs");
let stream;
stream = fs.createReadStream("./import/athlete_events.csv");

console.time();
stream.on("data", function(data) {
    var chunk = data.toString();
    console.log(`This is chunk: <<<${chunk}>>>`);
    
    // return;
}); 

console.timeEnd();