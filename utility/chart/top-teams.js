const Result = require("../../domain/olympic/result.js");
const Game = require("../../domain/olympic/game.js");
const Chart = require('./chart.js');

class TopTeams extends Chart {
    constructor(provider) {
        super();
        this.provider = provider;
        this.params = {};

        console.log('I am TopTeams')
    }

    analyzeArgs(data) {
        return new Promise((res, rej) => {
            let params = this.prepareParams(data, TopTeams.chartName);

            // try to fetch required params
            for (const param of params) {
                if (TopTeams.rule.medal[param] !== undefined) {
                    this.params['medal'] = TopTeams.rule.medal[param];
                } else if (TopTeams.rule.season[param] !== undefined) {
                    this.params['season'] = TopTeams.rule.season[param];
                } else {
                    this.params['year'] = parseInt(param)
                }
            }

            try {
                // analyze fetched params
                if (this.analyzeParamNames(Object.keys(this.params), TopTeams.required, TopTeams.chartName)) {
                    res(this);
                }
            } catch (e) {
                rej(e);
            }
        });
    }

    draw() {
        const season = this.params.season;
        const year = this.params.year;
        const medal = this.params.medal;

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
