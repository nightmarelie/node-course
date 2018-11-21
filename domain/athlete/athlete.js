class Athlete extends require('../common/base.js') {
    constructor(id, fullName, yearOfBirth, sex, params, team) {
        super(id);
        this.fullName = fullName;
        this.yearOfBirth = yearOfBirth;
        this.sex = sex;
        this.params = params;
        this.team = team;
    }
}

Athlete.sexEnum = {
    "M": 0,
    "F": 1 
};

module.exports = Athlete;