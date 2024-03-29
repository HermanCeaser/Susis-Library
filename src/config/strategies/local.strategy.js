const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy')

module.exports = function localStrategy() {
    passport.use(new Strategy(
        { usernameField: 'username', passwordField: 'password' },
        (username, password, done) => {
            const url = process.env.DB_HOST || 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            // check whether user exists in the Database
            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Client Connected successfully to server');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = await col.findOne({ username });

                    if (user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (error) {
                    debug(error.stack);
                }
                // close connection
                client.close();
            }());
        }
    ));
};
