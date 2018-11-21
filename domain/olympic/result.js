class Result extends Base {
    constructor(id, athlete, game, sport, event, modal) {
        super(id);
        this.athlete = athlete;
        this.game = game;
        this.sport = sport;
        this.event = event;
        this.modal = modal;
    }
}

Result.medalEnum = {
    0: "N/A",
    1: "Gold",
    2: "Silver",
    3: "Bronze"
}
