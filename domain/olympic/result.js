class Result extends Base {
    constructor(id, athlete, game, sport, event, modal) {
        super(id);
        this.athlete = athlete;
        this.game = game;
        this.sport = sport;
        this.event = event;
        this.medal = medal;
    }
}

Result.medalEnum = {
    "N/A": 0,
    "Gold": 1,
    "Silver": 2,
    "Bronze": 3
}
