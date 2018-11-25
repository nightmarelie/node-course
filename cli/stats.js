#!/usr/bin/env node
const arguments = process.argv.slice(2);
const connect = require('../db/connect.js')('./db/olympic_history.db');
const athletes = require('../domain/athlete/athletes.js')(connect);
const analyzer = new require("../utility/chart/analyzer.js")(athletes);

(function (args) {
    analyzer.analyze(args)
        .then(chartName => analyzer.initChart(chartName))
        .then(chart => chart.analyzeArgs(args))
        .then(chart => chart.draw())
        .catch(e => console.log(e.message));
})(arguments);
