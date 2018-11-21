const sqlite3 = require('sqlite3').verbose();  

class Connector {
    constructor(db) {
        this.db = new sqlite3.Database(db);
    }

    get(sql, params = []) {
        return new Promise((res, rej) => {
            // this.serialize(() => { 
                this.db.get(sql, params, function (err, result) {
                    if (err) {
                        rej(Connector.handlePromiseError(sql, err, params));
                    } else {
                        res(result)
                    }
                });
            // });
        });
    }
    
    all(sql, params = []) {
        return new Promise((res, rej) => {
            this.db.all(sql, params, function (err, rows) {
                if (err) {
                    rej(Connector.handlePromiseError(sql, err, params));
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
            // this.serialize(() => {
                this.db.run(sql, params, function (err) {
                    if (err) {
                        rej(Connector.handlePromiseError(sql, err, params));
                    } else {
                        res({ id: this.lastID })
                    }
                });
            // });
        });
    }

    static handlePromiseError(sql, error, params) {
        return new Error(`${error.message}\nError has occurred running sql ${sql}\nwith params: ${params}`)
    }

    close() {
        console.log('Close connection!');
        this.db.close();
    }

    serialize(execution) {
        return this.db.serialize(execution);
    }

    parallelize(execution) {
        return this.db.parallelize(execution);
    }
}

module.exports = function (db) {
    return new Connector(db);
};