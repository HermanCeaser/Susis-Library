const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

const router = (nav) => {
    authRouter.route('/signUp')
        .get((req, res) => {
            res.render('signup', {
                title: 'Susis Library',
                nav,
            });
        })
        .post((req, res) => {
            const { username, password } = req.body;
            const url = process.env.DB_HOST || 'mongodb://localhost:27017' ;
            const dbName = 'libraryApp';

            // Add user to the Database
            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Client Connected successfully to server');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, password };
                    const result = await col.insertOne(user);
                    // Log in the created user
                    req.logIn(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                } catch (error) {
                    debug(error.stack);
                }
            }());
        });

    authRouter.route('/signIn')
        .get((req, res) => {
            res.render('signin', {
                title: 'Susis Library',
                nav,
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/books',
            failureRedirect: '/auth/signIn'
        }));

    authRouter.route('/signout')
        .get((req, res) => {
            req.logOut();
            res.redirect('/');
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/auth/signIn');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;
