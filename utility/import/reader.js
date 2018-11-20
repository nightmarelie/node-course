const fs = require('fs');
const readline = require('readline');

module.exports = function (file, splitter, parser) {
    let result = [];
    let rd = readline.createInterface({
        input: fs.createReadStream(file),
        console: false
    });

    return new Promise(function (res, rej) {
        rd.on("line", function (line) {
            let arr = line.split(splitter);
            
            result.push(new parser(arr).build());
        });
        rd.on("close", function () {
            res(result);
        });
        rd.on("error", function (e) {
            rej(e);
        });
    });
};
