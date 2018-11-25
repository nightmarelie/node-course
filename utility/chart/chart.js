class Chart {
    constructor() {
    }

    draw() {
        throw new Error("I can't draw");
    }

    get symbol() {
        return Chart.symbol;
    }

    get maximum() {
        return Chart.maximum;
    }

    getSymbols(maxValue, currentValue) {
        const num = (currentValue * this.maximum) / maxValue;
        return this.symbol.repeat(num);
    }

    getIndent(length) {
        return " ".repeat(length);
    }

    prepareParams(data, chartName) {
        return data.filter(p => p !== chartName)
                   .map(p => p.charAt(0).toUpperCase() + p.slice(1));
    }

    analyzeParamNames(paramNames, requiredParams, chartName) {
        if (paramNames.length == 0) {
            throw new Error(`Please specify params for chart "${chartName}"`);
        } else if (paramNames.length < requiredParams.length || !requiredParams.every(p => paramNames.indexOf(p) > -1)) {
            throw new Error(`Please specify required params: ${requiredParams} for chart "${chartName}"`);
        }

        return true;
    }

    drawRow(column1, column2) {
        console.log(`${column1}${this.getIndent(Chart.indent)}${column2}`);
    }

    drawBy(promise) {
        const first = 0;
        const last = 1;

        promise
        .then(rawResult => {
            return new Promise((res, rej) => {
                if (rawResult.length == 0) {
                    rej(new Error("There is not results"));
                }

                const column = Object.keys(rawResult[first]);
                const max = Math.max(...rawResult.map(r => [r[column[last]]]).reduce((c, n) => c.concat(n), []));
                const data = rawResult.map(r => [r[column[first]], r[column[last]]]);
                
                res({max, column, data});
            });
        })
        .then(result => {
            this.drawRow(result.column[first], result.column[last]);
            for (const item of result.data) {
                this.drawRow(item[first], this.getSymbols(result.max, item[last]));
            }
        })
        .catch(e => console.log(e.message));
    }
} 

Chart.symbol = "█";
Chart.maximum = 100;
Chart.indent = 3;

module.exports = Chart;