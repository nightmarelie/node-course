const Athlete = require('./athlete.js');

class Athletes extends require('../common/entities.js') {
    constructor(connect) {
        super(connect);
    }

    createTeam(...args) {
        return this.connect.execute(
            'INSERT INTO teams (name, noc_name) VALUES (?, ?)',
            args)
    }

    createAthletes(id, name, yearOfBirth, sex, params, team) {
        let sexEnum = Athlete.sexEnum[sex]

        return this.connect.execute(
            'INSERT INTO athletes (id, full_name, year_of_birth, sex, params, team_id) VALUES (?, ?, ?, ?, ?, ?)',
            [id, name, yearOfBirth, sexEnum, JSON.stringify(params), team.id])
    }

    findAmountOfMedalsBySeasonAndNOCAndMedal(season, noc, medal) {
        return this.connect.all(
            `SELECT g.year, COALESCE(r1.count, 0) Amount FROM games g
                LEFT JOIN (
                    SELECT COUNT(t.noc_name) count, g1.year FROM results r 
                        JOIN athletes a ON a.id = r.athlete_id
                        JOIN teams t ON t.id = a.team_id
                        JOIN games g1 ON g1.id = r.game_id 
                    WHERE t.noc_name = $_noc 
                        AND g1.season = $_season
                        AND r.medal ${medal !== undefined ? '= $_medal' : '<> 0'}
                    GROUP BY g1.year
                ) r1 ON g.year = r1.year
            GROUP BY g.year
            ORDER BY g.year`,
            {
                $_season: season,
                $_noc: noc,
                $_medal: medal
            })
    }

    findAmountOfMedalsBySeasonAndYearAndMedal(season, year, medal) {
        return this.connect.all(
            `SELECT t.noc_name NOC, COUNT(r.medal) Amount FROM results r 
                JOIN athletes a ON a.id = r.athlete_id
                JOIN teams t ON t.id = a.team_id
                JOIN games g ON g.id = r.game_id 
            WHERE g.season = $_season
                AND r.medal ${medal !== undefined ? '= $_medal' : '<> 0'}
                ${year !== undefined ? ' AND g.year = $_year' : ' '}
            GROUP BY t.noc_name
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