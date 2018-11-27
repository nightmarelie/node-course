const csv = 'people.csv';

const reader = require('./utility/import/reader.js');
const parser = require('./utility/import/parser.js')();
const PeopleStats = require('./utility/statistics/people.js') 

console.time("Read time");
reader(`./import/${csv}`, ';', parser)
    .then(data => new PeopleStats(data).showStatsInfo())
    .catch(e => console.error(e.message))
    .then(() => console.timeEnd("Read time"));
