class Chart {
    constructor(args) {
        this.args = args;
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
} 

Chart.symbol = "█";
Chart.maximum = 100;

module.exports = Chart;