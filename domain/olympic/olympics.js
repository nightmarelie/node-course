class Olympics extends require('../common/entities.js') {
    constructor(connect) {
        super(connect);
    }
}

module.exports = function (connect) {
    return new Olympics(connect);
};