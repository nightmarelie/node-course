class Connector {
    /**
     * Gets entity
     * 
     * @param String sql `UPDATE table SET column = ?, ...`
     * @param Array data `['value']`
     * @param Function err 
     */
    static select(sql, data, err = (e, row) => {
        if (e) console.error(e.message)
        console.log(`select data: ${row}`);
    }) {
        Connect.db.run(sql, data, err);
    }

    /**
     * Updates entity
     * 
     * @param String sql `UPDATE table SET column = ?, ...`
     * @param Array data `['value']`
     * @param Function err 
     */
    static update(sql, data, err = e => {
        if (e) console.error(e.message)
        console.log(`row(s) updated: ${this.changes}`);
    }) {
        Connect.db.run(sql, data, err);
    }

    /**
     * Inserts entity
     * 
     * @param String sql `INSERT INTO table VALUES (?, ...)`
     * @param Array data `['value']`
     * @param Function err 
     */
    static insert(sql, data, err = e => {
        if (e) console.error(e.message)
        console.log(`a row has been inserted with rowid ${this.lastID}`);
    }) {
        Connect.db.run(sql, data, err);
        return this.lastID;
    }

    static close() {
        Connect.db.close();
    }
}

Connect.sqlite3 = require('sqlite3').verbose();
Connect.db = new Connect.sqlite3.Database('./olympic_history.db');

module.exports = Connector;