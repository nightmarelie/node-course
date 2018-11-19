let connector = require('./db/connect.js');

connector.insert(`INSERT INTO tems(name) VALUES(?)`, ['C'])