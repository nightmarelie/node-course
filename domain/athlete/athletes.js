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
            `SELECT g.year Year, COUNT(r.medal) Amount FROM results r 
                JOIN athletes a ON a.id = r.athlete_id
                JOIN teams t ON t.id = a.team_id
                JOIN games g ON g.id = r.athlete_id 
            WHERE g.season = ? 
                AND t.noc_name = ?
                ${medal !== undefined ? ' AND r.medal = ?' : ' AND r.medal <> 0'}
            GROUP BY g.year, g.season
            ORDER BY g.year`,
            [season, noc, medal])
    }

    findAmountOfMedalsBySeasonAndYearAndMedal(season, year, medal) {
        console.log(season, year, medal)
        return this.connect.all(
            `SELECT t.noc_name NOC, COUNT(r.medal) Amount FROM results r 
                JOIN athletes a ON a.id = r.athlete_id
                JOIN teams t ON t.id = a.team_id
                JOIN games g ON g.id = r.athlete_id 
            WHERE g.season = $_season
                ${year !== undefined ? ' AND g.year = $_year' : ' '}
                ${medal !== undefined ? ' AND r.medal = $_medal' : ' AND r.medal <> 0'}
            GROUP BY t.noc_name
            HAVING Amount > 25
            ORDER BY amount DESC`,
            {
                $_season: season,
                $_year: year,
                $_medal: medal
            })
    }
}

module.exports = function (connect) {
    return new Athletes(connect);
};