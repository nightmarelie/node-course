class Game extends Base {
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