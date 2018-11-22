const reader = require('./utility/import/reader.js');
const parser = require('./utility/import/parser.js');

const connect = require('./db/connect.js')('./db/olympic_history.db');
const athletes = require('./domain/athlete/athletes.js')(connect);
const olympics = require('./domain/olympic/olympics.js')(connect);

const importer = require('./utility/import/importer.js')(athletes, olympics);

console.time("Read time");
reader("./import/test_events.csv", /(,)(?=(?:[^"]|"[^"]*")*$)/, parser, importer)
    .then(result => console.log(result.length))
    .catch(e => console.error(e))
    .then(() => console.timeEnd("Read time"));
