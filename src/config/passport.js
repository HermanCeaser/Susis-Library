const passport = require('passport');
require('./strategies/local.strategy')();

const passportConfig = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // Stores user in Session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retrieve user from Session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

module.exports = passportConfig;
