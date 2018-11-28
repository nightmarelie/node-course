const sqlite3 = require('sqlite3');

class Connector {
    constructor(db) {
        this.db = new sqlite3.cached.Database(db)
            .run('PRAGMA synchronous = 0')
            .run('PRAGMA journal_mode = MEMORY');
    }

    get(sql, params = []) {
        return new Promise((res, rej) => {
            this.db.get(sql, params, function (err, result) {
                if (err) {
                    rej(Connector.handlePromiseError(sql, err, params));
                } else {
                    res(result)
                }
            });
        });
    }
    
    all(sql, params = []) {
        return new Promise((res, rej) => {
            this.db.all(sql, params, function (err, rows) {
                if (err) {
                    rej(Connector.handlePromiseError(sql, err, params));
                } else {
                    res(rows)
                }
            })
        })
    }

    /**
     * Execute task
     * 
     * @param String sql `INSERT or UPDATE or DELETE`
     * @param Array data `['value']`
     */
    execute(sql, params = []) {
        return new Promise((res, rej) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    rej(Connector.handlePromiseError(sql, err, params));
                } else {
                    res({ id: this.lastID })
                }
            });
        });
    }

    static handlePromiseError(sql, error, params) {
        return new Error(`${error.message}\nError has occurred running sql ${sql}\nwith params: ${params}`)
    }

    serialize(execution) {
        return this.db.serialize(execution);
    }

    parallelize(execution) {
        return this.db.parallelize(execution);
    }

    execTransaction(execution) {
        this.db.all('BEGIN TRANSACTION', () => {
            // prepare tables
            this.db.run('DELETE FROM teams')
                .run('DELETE FROM sqlite_sequence WHERE name="teams"')
                .run('DELETE FROM athletes')
                .run('DELETE FROM sqlite_sequence WHERE name="athletes"')
                .run('DELETE FROM games')
                .run('DELETE FROM sqlite_sequence WHERE name="games"')
                .run('DELETE FROM sports')
                .run('DELETE FROM sqlite_sequence WHERE name="sports"')
                .run('DELETE FROM events')
                .run('DELETE FROM sqlite_sequence WHERE name="events"')
                .run('DELETE FROM results')
                .run('DELETE FROM sqlite_sequence WHERE name="results"');

            console.time("Insert time");
            Promise.all(execution())
                .then(() => console.timeEnd("Insert time"));
        })
        .all('COMMIT', () => {})
        .close()
    }
}

module.exports = function (db) {
    return new Connector(db);
};
