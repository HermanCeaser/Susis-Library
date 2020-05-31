const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

const router = () => {
    authRouter.route('/signUp')
        .post((req, res) => {
            debug(req.body);

            // Create User and Log them in
            req.logIn(req.body, () => {
                res.redirect('/auth/profile');
            });
        });

    authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;
