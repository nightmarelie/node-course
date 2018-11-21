class Game extends Base {
    constructor(id, year, season, city) {
        super(id);
        this.year = year;
        this.season = season;
        this.city = city;
    }
}

Game.seasonEnum = {
    0: "Summer",
    1: "Winter"
};