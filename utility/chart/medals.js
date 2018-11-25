const Result = require("../../domain/olympic/result.js");
const Game = require("../../domain/olympic/game.js");
const Chart = require('./chart.js');

class Medals extends Chart {
    constructor(provider) {
        super();
        this.provider = provider;
        this.params = {};
    }

    analyzeArgs(data) {
        return new Promise((res, rej) => {
            let params = this.prepareParams(data, Medals.chartName);

            // try to fetch required params
            for (const param of params) {
                if (Medals.rule.medal[param] !== undefined) {
                    this.params['medal'] = Medals.rule.medal[param];
                } else if (Medals.rule.season[param] !== undefined) {
                    this.params['season'] = Medals.rule.season[param];
                } else {
                    this.params['noc'] = param
                }
            }

            try {
                // analyze fetched params
                if (this.analyzeParamNames(Object.keys(this.params), Medals.required, Medals.chartName)) {
                    res(this);
                }
            } catch (e) {
                rej(e);
            }
        });
    }

    draw() {
        const season = this.params.season;
        const noc = this.params.noc;
        const medal = this.params.medal;

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