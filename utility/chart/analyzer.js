const Medals = require('./medals.js').Medals;
const TopTeams = require('./top-teams.js').TopTeams;

class Analyzer {
    constructor (provider) {
        this.provider = provider;
        this.data = [];
    }

    analyze(data) {
        return new Promise((res, rej) => {
            for (const item of data) {
                console.log(item);
                if (Analyzer.support.includes(item)) {
                    return res(item);
                }
            }
            
            return rej(new Error(`Please specify correct chart name. There are: ${Analyzer.support.join(', ')}`));
        });
    }

    initChart(chartName) {
        return new Promise((res, rej) => {
            if (chartName !== undefined) {
                let requireChart;
                try {
                    requireChart = require(`./${chartName}.js`).chart;
                    res(new requireChart(this.data, this.provider));
                } catch(e) {
                    rej(e);
                } 
            }
            rej(new Error("Chart name isn't provided"));
        });
    }
}

Analyzer.support = [
    Medals.chartName,
    TopTeams.chartName
];

module.exports = function (provider) {
    return new Analyzer(provider);
};
