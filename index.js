const reader = require('./utility/import/reader.js');
const parser = require('./utility/import/parser.js');

const connect = require('./db/connect.js')('./db/olympic_history.db');
const athletes = require('./domain/athlete/athletes.js')(connect);
const olympics = require('./domain/olympic/olympics.js')(connect);

reader("./import/test_events.csv", ",", parser)
    // .then(result => console.log(result))
    .then(list => list.map(async function (el) {
        console.log(`try to save row: \n`)
        console.log(el);
        const data = el.data;

        athletes.findTeamByNOC(data.noc)
            .then(team => {
                if (!team) {
                    return athletes.createTeam(data.team, data.noc);
                } else {
                    return Promise.resolve(team);
                }
            })
            // .then(team => team === undefined ? athletes.findTeamByNOC(data.noc) : team)
            .then(team => console.log(team))
            .catch(error => console.error(error.message));
    }))
    .catch(error => console.error(error.message))
    // .then(() => connect.close());
