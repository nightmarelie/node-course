const connector = new require('./db/connect.js')
const connect = new connector('./db/olympic_history.db');

connect.execute(`INSERT INTO teams(name, noc_name) VALUES(?, ?)`, ['TEST5', '221188'])
.then(res => { console.log(res) })
.catch(e => { console.error(e.message) });
connect.close();
