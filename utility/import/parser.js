class Parser {
    constructor(purgeRules = {}) {
        this.purgeRules = purgeRules;
    }

    init(rowData) {
        ++Parser.row;

        let result = rowData.map((el) => el.replace(/["]/gi, ''));

        if (Parser.row == 0) {
            Parser.column = result.map(el => el.toLowerCase()); 
        } else {
            this.data = this.purgeByRule(result);
        }

        return this;
    }

    purgeByRule(rowData) {
        return rowData.map((el, i) => {
            let rule = this.purgeRules[Parser.column[i]];
            let result = el;

            if (rule !== undefined) {
                result = el.replace(rule, '')
            }

            return result;
        })
        .map(el => el.trim());
    }

    build() {
        if (Parser.row == 0) return;
        return {
            row: Parser.row,
            data: Parser.column.map((el, i) => ({[el]: this.data[i]}))
                               .reduce((current, next) => ({ ...current, ...next}), {})
        };
    }
}

Parser.row = -1;
Parser.column = [];

module.exports = function (purgeRules) {
    return new Parser(purgeRules);
}
