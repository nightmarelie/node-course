class Game extends require('../common/base.js') {
    constructor(id, year, season, city) {
        super(id);
        this.year = year;
        this.season = season;
        this.city = city;
    }
}

Game.seasonEnum = {
    "Summer": 0,
    "Winter": 1
};

Game.exception = {
    year: 1906,
    season: "Summer",

}

module.exports = Game;