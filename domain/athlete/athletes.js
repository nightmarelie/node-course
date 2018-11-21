class Athletes extends require('../common/entities.js') {
    constructor(connect) {
        super(connect);
    }

    createTeam(name, noc) {
        return this.connect.execute(
            'INSERT INTO teams (name, noc_name) VALUES (?, ?)',
            [name, noc])
    }

    findTeamByNOC(noc) {
        return this.connect.get(
            `SELECT * FROM teams WHERE noc_name = ?`,
            [noc])
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