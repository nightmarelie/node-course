const Chart = require('./chart.js');

class TopTeams extends Chart {
    constructor(provider) {
        super();
        this.provider = provider;
        this.params = {};

        console.log('I am TopTeams')
    }
}

TopTeams.chartName = 'top-teams';

module.exports = {
    chart: function (provider) {
        return new TopTeams(provider);
    },
    TopTeams: TopTeams,
}
