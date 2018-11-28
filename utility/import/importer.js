class Importer {
    constructor(connect) {
        this.athletes = require('../../domain/athlete/athletes.js')(connect);
        this.olympics = require('../../domain/olympic/olympics.js')(connect);
        this.connect = connect;
        this.result = {};
    }

    cachingSource(key, func, ...args) {
        if (Importer.cache.has(key)) {
            return Importer.cache.get(key);
        }

        let result = func.call(this, ...args)
        Importer.cache.set(key, result);

        return result;
    }

    importData(data) {
        this.connect.execTransaction(() => {
            const promises = [];
            for (const obj of data) {
                promises.push(this.import(obj));
            }
            return promises;
        })
    }

    aggregate(row, obj) {
        let previous = this.result[row];
        // aggregates data for result
        this.result[row] = Object.assign(previous || {}, obj);
    }

    import(obj) {
        return new Promise(res => {
            const data = obj.data;
            const row = obj.row;
    
            this.cachingSource(data.noc, this.athletes.createTeam, data.team, data.noc)
                .then(team => {
                    let year = parseInt(data.year);
                    let age = parseInt(data.age);
                    let yearOfBirth = null;
                    let height = parseInt(data.height);
                    let weight = parseInt(data.weight);
                    let params = [{height}, {weight}].filter(o => !isNaN(Object.values(o)[0]))
                                                        .reduce((current, next) => ({ ...current, ...next}), {});
    
                    if (!isNaN(year) && !isNaN(age)) {
                        yearOfBirth = year - age;
                    }
    
                    return this.athletes.createAthletes(data.name, yearOfBirth, data.sex, params, team);
                })
                .then(athlete => this.aggregate(row, ({athlete})))
                .then(() => {
                    const {year, season} = data
                    const key = `${year}${season}`;
                    const cities = Importer.cityGames[key] || [];
                    cities.push(data.city)
                    Importer.cityGames[key] = cities.filter((value, index, self) => self.indexOf(value) === index);

                    const citiesString = Importer.cityGames[key].join();
                    let result;
                    if (Importer.cache.has(key)) {
                        this.olympics.updateGame(citiesString, year, season);
                        result = Importer.cache.get(key);
                    } else {
                        result = this.olympics.createGame(year, season, citiesString);
                        Importer.cache.set(key, result);
                    }
    
                    return result;
                })
                .then(game => this.aggregate(row, ({game})))
                .then(() => this.cachingSource(data.sport, this.olympics.createSport, data.sport))
                .then(sport => this.aggregate(row, ({sport})))
                .then(() => this.cachingSource(data.event, this.olympics.createEvent, data.event))
                .then(event => this.aggregate(row, ({event})))
                .then(() => this.olympics.createResult(data.medal, this.result[row]))
                .catch(err => {
                    if (err.code == 'SQLITE_CONSTRAINT_UNIQUE') {
                        console.error(err.message);
                    }
                })
                .then(() => res(`Row ${row} was inserted`))
        });
    }
}

Importer.cityGames = [];
Importer.cache = new Map();

module.exports = function (connect) {
    return new Importer(connect);
}
