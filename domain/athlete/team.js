class Team extends require('../common/base.js') {
    constructor(id, name, nocName) {
        super(id);
        this.name = name;
        this.nocName = nocName;
    }
}