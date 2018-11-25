const Chart = require('./chart.js');

class TopTeams extends Chart {
    constructor(args, provider) {
        super(args);
        this.provider = provider;
        this.params = [];

        console.log('I am TopTeams')
    }
}

TopTeams.chartName = 'top-teams';

module.exports = {
    chart: function (args, provider) {
        return new TopTeams(args, provider);
    },
    TopTeams: TopTeams,
}
