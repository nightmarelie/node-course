class Base {
    constructor(id) {
        this.id = id;
    }
}
/* helpers */
Object.prototype.getKeyByValue = function(value) {
    for(let prop in this) {
        if(this.hasOwnProperty(prop)) {
            if(this[prop] === value) return prop;
        }
    }
}
