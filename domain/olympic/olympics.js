const Game = require('./game.js');
const Result = require('./result.js');

class Olympics extends require('../common/entities.js') {
    constructor(connect) {
        super(connect);
    }

    createGame(year, season, city) {
        const seasonEnum = Game.seasonEnum[season];

        if (Game.exception.season == season && Game.exception.year == year) {
            throw new Error('The Game of 1906 Summer is not official');
        }

        return this.connect.execute(
            'INSERT INTO games (year, season, city) VALUES (?, ?, ?)',
            [year, seasonEnum, city])
    }

    findGameByYearAndSeason(...args) {
        return this.connect.get(
            'SELECT * FROM games WHERE year = ? AND season = ?',
            args)
    }

    createSport(...args) {
        return this.connect.execute(
            'INSERT INTO sports (name) VALUES (?)',
            args)
    }

    createEvent(...args) {
        return this.connect.execute(
            'INSERT INTO events (name) VALUES (?)',
            args)
    }

    createResult(medal, result) {
        const medalEnum = Result.medalEnum[medal] || 0;
        const {athlete: {id: athleteId}, game: {id: gameId}, sport: {id: sportId}, event: {id: eventId}} = result;

        return this.connect.execute(
            'INSERT INTO results (athlete_id, game_id, sport_id, event_id, medal) VALUES (?, ?, ?, ?, ?)',
            [athleteId, gameId, sportId, eventId, medalEnum])
    }
}

module.exports = function (connect) {
    return new Olympics(connect);
};
