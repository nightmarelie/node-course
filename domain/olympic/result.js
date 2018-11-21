class Result extends require('../common/base.js') {
    constructor(id, athlete, game, sport, event, medal) {
        super(id);
        this.athlete = athlete;
        this.game = game;
        this.sport = sport;
        this.event = event;
        this.medal = medal;
    }
}

Result.medalEnum = {
    "NA": 0,
    "Gold": 1,
    "Silver": 2,
    "Bronze": 3
}

module.exports = Result;
