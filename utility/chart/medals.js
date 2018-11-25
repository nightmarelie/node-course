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

        this.getStatBySeasonAndNOCAndMedal(season, noc, medal)
        .then(rawResult => {
            return new Promise((res, rej) => {
                if (rawResult.length == 0) {
                    rej(new Error("There is not results"));
                }

                const column = Object.keys(rawResult[0]);
                const max = Math.max(...rawResult.map(r => [r[column[1]]]).reduce((c, n) => c.concat(n), []));
                const data = rawResult.map(r => [r[column[0]], r[column[1]]]);
                
                res({max, column, data});
            });
        })
        .then(result => {
            const first = 0;
            const last = 1;

            console.log(`${result.column[first]}${this.getIndent(Medals.indent)}${result.column[last]}`);
            for (const item of result.data) {
                console.log(`${item[first]}${this.getIndent(Medals.indent)}${this.getSymbols(result.max, item[last])}`);
            }
        })
        .catch(e => console.log(e.message));
    }

    getStatBySeasonAndNOC(season, noc) {
        return this.provider.findAmountOfMedalsBySeasonAndNOC(season, noc);
    }

    getStatBySeasonAndNOCAndMedal(season, noc, medal) {
        return this.provider.findAmountOfMedalsBySeasonAndNOCAndMedal(season, noc, medal);
    }
}

Medals.chartName = 'medals';
Medals.indent = 3;
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