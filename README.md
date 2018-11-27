##### Import data:
- Structure
```bash
.
├── db
│   ├── connect.js
│   └── olympic_history.db
├── domain
│   ├── athlete
│   ├── common
│   └── olympic
├── import
│   ├── athlete_events.csv
│   └── test_events.csv
├── index.js
└── utility
    └── import
        ├── reader.js
        ├── parser.js
        └── importer.js
```

- Import
```sh
$ time node index.js
```
##### View diagram:
- Structure
```bash
.
├── cli
│   └── stats.js
├── domain
│   ├── athlete
│   └── olympic
└── utility
    └── chart
        ├── analyzer.js
        ├── chart.js
        ├── medals.js
        └── top-teams.js
```
- Start npm with parameters
```sh
$ npm link
```
> /usr/local/bin/stats -> /usr/local/lib/node_modules/course-1/cli/stats.js

> /usr/local/lib/node_modules/course-1 -> ~/node/course
- View medals chart
```sh
$ stats medals season[summer|winter] noc medal[gold|silver|bronze]
```
- View top-teams chart
```sh
$ stats top-teams season[summer|winter] year medal[gold|silver|bronze]
```
##### Clear data:
```sh
$ git checkout -- db/olympic_history.db
```
##### Unlink script:
```sh
$ npm unlink
```
> removed 1 package in 0.Xs

##### Show person statistics:
- Structure
```bash
.
├── import
│   └── people.csv
├── people.js
└── utility
    ├── import
    │   └── reader.js
    └── statistics
        └── people.js
```
- Show stats
```sh
$ node people.js
```