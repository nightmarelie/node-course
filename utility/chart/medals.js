const Result = require("../../domain/olympic/result.js");
const Game = require("../../domain/olympic/game.js");
const Chart = require('./chart.js');

class Medals extends Chart {
    constructor(args, provider) {
        super(args);
        this.provider = provider;
        this.params = [];

        console.log('I am Medals')
    }

    draw() {
        let season = 'Winter';
        let noc = 'FRA';

        this.getStatBySeasonAndNOC(season, noc)
            .then(result => {
                const first = 0;
                const last = 1;
                console.log(`${result.column[first]}${this.getIndent(Medals.indent)}${result.column[last]}`);
                for (const item of result.data) {
                    console.log(`${item[first]}${this.getIndent(Medals.indent)}${this.getSymbols(result.max, item[last])}`);
                }
            })
            .catch(e => console.log(e));
    }

    getStatBySeasonAndNOC(season, noc) {
        return this.provider.findAmountOfMedalsBySeasonAndNOC(season, noc);
    }

    getStatBySeasonAndNOCAndMedal(season, noc, medal) {
        return this.provider.findAmountOfMedalsBySeasonAndNOCAndMedal(season, noc, medal);
    }
}

Medals.indent = 3
Medals.rule = {
    medal: Result.medalEnum,
    season: Game.seasonEnum,
    noc: ''
};

module.exports = function (args, provider) {
    return new Medals(args, provider);
}