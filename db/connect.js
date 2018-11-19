const sqlite3 = require('sqlite3').verbose();  

class Connector {
    constructor(db) {
        this.db = new sqlite3.Database(db);
    }

    get(sql, params = []) {
        return new Promise((res, rej) => {
            this.db.get(sql, params, function (err, result) {
                if (err) {
                    rej(Connector.handlePromiseError(sql, err));
                } else {
                    res(result)
                }
            })
        })
    }
    
    all(sql, params = []) {
        return new Promise((res, rej) => {
            this.db.all(sql, params, function (err, rows) {
                if (err) {
                    rej(Connector.handlePromiseError(sql, err));
                } else {
                    res({rows, db: this.db})
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
                    rej(Connector.handlePromiseError(sql, err));
                } else {
                    res({ id: this.lastID })
                }
            });
        });
    }

    static handlePromiseError(sql, error) {
        return new Error(`${error.message}\nError has occurred running sql ${sql}`)
    }

    close() {
        this.db.close();
    }
}

module.exports = Connector;