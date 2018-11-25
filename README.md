##### Import data:
```sh
$ time node index.js
```
##### View diagram:
- Start npm with parameters
```sh
$ npm link
```
> /usr/local/bin/stats -> /usr/local/lib/node_modules/course-1/cli/stats.js

> /usr/local/lib/node_modules/course-1 -> /Users/akryvtsov/Programming/node/course
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
