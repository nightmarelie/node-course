class Analyzer {
    constructor (provider) {
        this.provider = provider;
        this.chart = 'chart';
        this.data = [];
    }

    analyze(data) {
        return new Promise((res, rej) => {
            console.log(data);
            //TODO: calculate chart
            this.chart = 'medals';
    
            return res(this);
        });
    }

    getChart() {
        return new Promise((res, rej) => {
            if (this.chart !== undefined) {
                let requireChart;
                try {
                    requireChart = require(`./${this.chart}.js`);
                    res(new requireChart(this.data, this.provider));
                } catch(e) {
                    rej(new Error("Chart name isn't exist"));
                } 
            }
            rej(new Error("Chart name isn't provided"));
        });
    }
}

Analyzer.support = [
    "medals",
    "top-teams"
];

module.exports = function (provider) {
    return new Analyzer(provider);
};
