// const connector = new require('./db/connect.js')
// const connect = new connector('./db/olympic_history.db');

// connect.execute(`INSERT INTO teams(name, noc_name) VALUES(?, ?)`, ['TEST5', '221188'])
// .then(res => { console.log(res) })
// .catch(e => { console.error(e.message) });
// connect.close();

const reader = require('./utility/import/reader.js');
const parser = require('./utility/import/parser.js');

reader("./import/test_events.csv", ",", parser)
    .then(result => {
        console.log(result);
    })
    .catch(e => console.error(e));
