#!/usr/bin/env node
const arguments = process.argv.slice(2);
const connect = require('../db/connect.js')('./db/olympic_history.db');
const athletes = require('../domain/athlete/athletes.js')(connect);
const analyzer = new require("../utility/chart/analyzer.js")(athletes);

//1. stats medals season[Summer|Winter] noc medal[Gold|Silver|Bronze]
// EXAMPLE: stats medals summer SUR gold
//2. stats top-teams season[Summer|Winter] year medal[Gold|Silver|Bronze]
// EXAMPLE: stats top-teams summer 2004 silver
(function (args) {
    analyzer.analyze(args)
        .then(chartName => analyzer.initChart(chartName))
        .then(chart => chart.analyzeArgs(args))
        .then(chart => chart.draw())
        .catch(e => console.log(e.message));
})(arguments);
