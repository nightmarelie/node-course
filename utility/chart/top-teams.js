class TopTeams extends Chart {
    constructor(arguments) {
        console.log('I am TopTeams')
    }
}

module.exports = function (arguments) {
    return new TopTeams(arguments);
}