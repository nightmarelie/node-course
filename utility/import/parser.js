class Parser {
    constructor(rowData) {
        ++Parser.row;
        this.init(rowData)
    }

    init(rowData) {
        let result = rowData.map((el) => el.replace(/["]/gi, ''));

        if (Parser.row == 0) {
            Parser.column = result.map(el => el.toLowerCase()); 
        } else {
            this.data = this.purgeByRule(result);
        }
    }

    purgeByRule(rowData) {
        return rowData.map((el, i) => {
            let rule = Parser.purgeRules[Parser.column[i]];
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
                .reduce((current, next) => {
                    return { ...current, ...next};
                }, {})
        };
    }
}

Parser.row = -1;
Parser.column = [];
Parser.purgeRules = {
    'name': /\s\(.*?\)/gi,
    'team': /-\d*$/,
};

module.exports = Parser;
