class Importer {
    constructor(athletes, olympics) {
        this.athletes = athletes;
        this.olympics = olympics;
        this.result = {};
    }

    aggregate(row, obj) {
        let previous = this.result[row];
        // aggregates data for result
        this.result[row] = Object.assign(previous || {}, obj);
        // moving on
        // return Promise.resolve(true);
    }

    import(obj) {
        const data = obj.data;
        const row = obj.row;

        this.athletes.findTeamByNOC(data.noc)
            .then(team => !team ? this.athletes.createTeam(data.team, data.noc) : Promise.resolve(team))
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
                let key = `${data.year}${data.season}`;
                let cities = Importer.cityGames[key] || [];
                cities.push(data.city)
                Importer.cityGames[key] = cities.filter((value, index, self) => self.indexOf(value) === index);
                return this.olympics.createGame(data.year, data.season, Importer.cityGames[key].join())
            })
            .then(game => this.aggregate(row, ({game})))
            .then(() => this.olympics.createSport(data.sport))
            .then(sport => this.aggregate(row, ({sport})))
            .then(() => this.olympics.createEvent(data.sport))
            .then(event => this.aggregate(row, ({event})))
            .then(() => this.olympics.createResult(data.medal, this.result[row]))
            .catch(error => console.error(error.message));
    }
}

Importer.cityGames = [];

module.exports = function (athletes, olympics) {
    return new Importer(athletes, olympics);
}
