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
} 

Chart.symbol = "█";
Chart.maximum = 100;

module.exports = Chart;