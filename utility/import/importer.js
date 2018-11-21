class Importer {
    constructor(athletes, olympics) {
        this.athletes = athletes;
        this.olympics = olympics;
    }

    import(obj) {
        const data = obj.data;

        this.athletes.findTeamByNOC(data.noc)
            .then(team => !team ? this.athletes.createTeam(data.team, data.noc) : team)
            .then(team => {
                let year = parseInt(data.year);
                let age = parseInt(data.age);
                let yearOfBirth = null;
                let height = parseInt(data.height);
                let weight = parseInt(data.weight);
                let params = [{height}, {weight}].filter((o, i) => !isNaN(Object.values(o)[0]))
                                                 .reduce((current, next) => ({ ...current, ...next}), {});

                if (!isNaN(year) && !isNaN(age)) {
                    yearOfBirth = year - age;
                }

                return this.athletes.createAthletes(data.name, yearOfBirth, data.sex, params, team);
            })
            .then(athlete => console.log(athlete))
            .catch(error => console.error(error.message));
    }
}

module.exports = function (athletes, olympics) {
    return new Importer(athletes, olympics);
}
