const Athlete = require('./athlete.js');

class Athletes extends require('../common/entities.js') {
    constructor(connect) {
        super(connect);
    }

    createTeam(...args) {
        return this.connect.execute(
            'INSERT OR IGNORE INTO teams (name, noc_name) VALUES (?, ?)',
            args)
    }

    createAthletes(name, yearOfBirth, sex, params, team) {
        let sexEnum = Athlete.sexEnum[sex]

        return this.connect.execute(
            'INSERT INTO athletes (full_name, year_of_birth, sex, params, team_id) VALUES (?, ?, ?, ?, ?)',
            [name, yearOfBirth, sexEnum, JSON.stringify(params), team.id])
    }

    findAmountOfMedalsBySeasonAndNOCAndMedal(season, noc, medal) {
        return this.connect.all(
            `SELECT g.year, count(r.id) amount FROM results r 
                JOIN athletes a ON a.id = r.athlete_id
                JOIN teams t ON t.id = a.team_id
                JOIN games g ON g.id = r.athlete_id 
            WHERE g.season = ? AND t.noc_name = ?${medal !== undefined ? ' AND r.medal = ?' : ' '}
            GROUP BY g.year, g.season
            ORDER BY g.year`,
            [season, noc, medal])
    }
}

module.exports = function (connect) {
    return new Athletes(connect);
};