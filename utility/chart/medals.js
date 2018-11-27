const Result = require("../../domain/olympic/result.js");
const Game = require("../../domain/olympic/game.js");
const Chart = require('./chart.js');

class Medals extends Chart {
    constructor(provider) {
        super();
        this.provider = provider;
    }

    analyzeArgs(data) {
        return super.analyzeArgs(data, Medals, (params, rules) => {
            const fetchedParams = [];
            // try to fetch required params
            for (const param of params) {
                if (rules.medal[param] !== undefined) {
                    fetchedParams['medal'] = rules.medal[param];
                } else if (rules.season[param] !== undefined) {
                    fetchedParams['season'] = rules.season[param];
                } else {
                    fetchedParams['noc'] = param.toUpperCase();
                }
            }

            return fetchedParams;
        });
    }

    draw() {
        const {season, noc, medal} = this.params;

        this.drawBy(this.provider.findAmountOfMedalsBySeasonAndNOCAndMedal(season, noc, medal));
    }
}

Medals.chartName = 'medals';

Medals.rule = {
    medal: Result.medalEnum,
    season: Game.seasonEnum,
    noc: ''
};
Medals.required = ['noc', 'season'];

module.exports = {
    chart: function (provider) {
        return new Medals(provider);
    },
    Medals: Medals,
}