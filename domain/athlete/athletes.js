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
            'INSERT INTO teams (name, noc_name) VALUES (?, ?)',
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

    // get(id) {
    //     return this.connect.all(
    //       `SELECT * FROM tasks WHERE id = ?`,
    //       [id])
    // }

    // getById(id) {
        // return this.connect.get(
            // `SELECT * FROM tasks WHERE id = ?`, 
            // [id])
    // }
}

module.exports = function (connect) {
    return new Athletes(connect);
};