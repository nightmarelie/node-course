const db = 'olympic_history.db';
const csv = 'test_events.csv'; // test_events|athlete_events

const reader = require('./utility/import/reader.js');
const parser = require('./utility/import/parser.js');
const connect = require('./db/connect.js')(`./db/${db}`);
const importer = require('./utility/import/importer.js')(connect);

console.time("Read time");
reader(`./import/${csv}`, /(?:,)(?=(?:[^"]|"[^"]*")*$)/, parser)
    .then(data => importer.importData(data))
    .catch(console.error)
    .then(() => console.timeEnd("Read time"));
