class Athlete extends Base {
    constructor(id, fullName, yearOfBirth, sex, params, team) {
        super(id);
        this.fullName = fullName;
        this.yearOfBirth = yearOfBirth;
        this.sex = sex;
        this.params = params;
        this.team = team;
    }
}
