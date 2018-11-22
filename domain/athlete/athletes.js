const Athlete = require('./athlete.js');

class Athletes extends require('../common/entities.js') {
    constructor(connect) {
        super(connect);
    }

    findOrExecute(name, noc) {
        return this.connect.getOrExecute(
            'SELECT * FROM teams WHERE noc_name = ?',
            [noc],
            'INSERT INTO teams (name, noc_name) VALUES (?, ?)',
            [name, noc]);
    }

    createTeam(...args) {
        return this.connect.execute(
            'INSERT OR IGNORE INTO teams (name, noc_name) VALUES (?, ?)',
            args)
    }

    findTeamByNOC(...args) {
        return this.connect.get(
            'SELECT * FROM teams WHERE noc_name = ?',
            args)
    }

    createAthletes(name, yearOfBirth, sex, params, team) {
        let sexEnum = Athlete.sexEnum[sex]

        return this.connect.execute(
            'INSERT INTO athletes (full_name, year_of_birth, sex, params, team_id) VALUES (?, ?, ?, ?, ?)',
            [name, yearOfBirth, sexEnum, JSON.stringify(params), team.id])
    }

    findAmountOfMedalsBySeasonAndNOC(season, noc) {
        return Promise.resolve({
            max: 50,
            column: [
                "NOC", "Amount"
            ],
            data: [
                ["USA", 50],
                ["RUS", 30], 
                ["USA", 5], 
                ["RUS", 3], 
                ["RUS", 2], 
                ["RUS", 25], 
                ["UGA", 10]
            ]
        });
    }

    findAmountOfMedalsBySeasonAndNOCAndMedal() {
        
    }
}

module.exports = function (connect) {
    return new Athletes(connect);
};