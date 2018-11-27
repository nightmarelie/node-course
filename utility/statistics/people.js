class People {
    constructor(core = []) {
        if (core.length == 0) {
            throw new Error("Please provide data for statistics class");
        }

        this.core = core; // array of data
    }

    get count() {
        return this.core.length;
    }

    get popularName() {
        return this.popularBy(p => {
            let {data:{first_name:name}} = p;
            return name;
        })
    }

    popularBy(getter) {
        const {entity} = Array.from(this.core
            .map(getter)
            .map(n => ({entity: n}))
            .reduce((mp, o) => {
                if (!mp.has(o.entity)) mp.set(o.entity, Object.assign({ count: 0 }, o));
                mp.get(o.entity).count++;
                
                return mp;
            }, new Map)
            .values())
            .sort((a, b) => {
                const {count:c1} = a;
                const {count:c2} = b;
                let result = 0;
                if (c1 > c2)
                    result = -1;
                if (c1 < c2)
                    result = 1;
                return result;
            })[0];

        return entity;
    }

    get numberOfMenAndWomen() {
        const numMen = this.getCountBy(p => {
            let {data:{gender}} = p;
            return gender == 'Male';
        });

        const numWomen = this.getCountBy(p => {
            let {data:{gender}} = p;
            return gender == 'Female';
        });

        return {numMen, numWomen};
    }

    getCountBy(f) {
        return this.core.filter(f).length
    }

    get averageHeight() {
        return this.getAverage(p => {
            let {data:{height}} = p;
            return height;
        })
    }

    get averageWeight() {
        return this.getAverage(p => {
            let {data:{weight}} = p;
            return weight;
        })
    }

    getAverage(getter) {
        return this.core
                .map(getter)
                .map(h => parseInt(h))
                .reduce((c, p) => c += p, 0) / this.count;
    }

    get popularCountry() {
        return this.popularBy(p => {
            let {data:{country}} = p;
            return country;
        })
    }

    infoAboutPeopleByPopularName(popularName) {
        const persont = this.infoAboutPeopleBy(p => {
            let {data:{first_name:name}} = p;
            return name == popularName;
        })

        return this.showPersonInfo(persont);
    }

    infoAboutPeopleByPopularCountry(popularCountry) {
        const persont = this.infoAboutPeopleBy(p => {
            let {data:{country}} = p;
            return country == popularCountry;
        })

        return this.showPersonInfo(persont);
    }

    infoAboutPeopleBy(criteria) {
        return this.core.filter(criteria)[0];
    }

    showPersonInfo(person) {
        const {data:{id, first_name, last_name, email, gender, company, country, height, weight}} = person;

        return `\n
            id: ${id},
            first_name: ${first_name},
            last_name: ${last_name},
            email: ${email},
            gender: ${gender},
            company: ${company},
            country: ${country},
            height: ${height},
            weight: ${weight}
        `;
    }

    showStatsInfo() {
        const {numMen, numWomen} = this.numberOfMenAndWomen;
        const popularName = this.popularName;
        const popularCountry = this.popularCountry;

        console.log(`
1) The most popular name is: ${popularName};
2) The number of men is: ${numMen} and women is: ${numWomen};
3) Average height is: ${this.averageHeight};
4) Average weight is: ${this.averageWeight};
5) The name of the most popular country is ${popularCountry};
6) All data about a person with the most popular name is: ${this.infoAboutPeopleByPopularName(popularName)}
   and from the most popular country is: ${this.infoAboutPeopleByPopularCountry(popularCountry)}
        `.trim());
    }
}

module.exports = People;