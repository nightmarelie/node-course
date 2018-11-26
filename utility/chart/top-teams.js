const Result = require("../../domain/olympic/result.js");
const Game = require("../../domain/olympic/game.js");
const Chart = require('./chart.js');

class TopTeams extends Chart {
    constructor(provider) {
        super();
        this.provider = provider;
    }

    analyzeArgs(data) {
        return super.analyzeArgs(data, TopTeams, (params, rules) => {
            const fetchedParams = [];
            let year;
            // try to fetch required params
            for (const param of params) {
                if (rules.medal[param] !== undefined) {
                    fetchedParams['medal'] = rules.medal[param];
                } else if (rules.season[param] !== undefined) {
                    fetchedParams['season'] = rules.season[param];
                } else if (year = parseInt(param)) {
                    fetchedParams['year'] = year
                }
            }

            return fetchedParams;
        });
    }

    draw() {
        const {season, year, medal} = this.params;

        this.drawBy(this.provider.findAmountOfMedalsBySeasonAndYearAndMedal(season, year, medal));
    }
}

TopTeams.chartName = 'top-teams';
TopTeams.rule = {
    medal: Result.medalEnum,
    season: Game.seasonEnum,
    year: ''
};
TopTeams.required = ['season'];

module.exports = {
    chart: function (provider) {
        return new TopTeams(provider);
    },
    TopTeams: TopTeams,
}
