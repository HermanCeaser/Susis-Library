const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRouter');

const bookRouter = express.Router();

const router = (nav) => {

    bookRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected Successfully to server');

                    const db = client.db(dbName);
                    const col = db.collection('books');
                    const books = await col.find().toArray();
                    res.render('books', {
                        books,
                        title: 'Library',
                        nav,
                    });
                } catch (err) {
                    debug(err.stack);
                }
            }());
        });

    bookRouter.route('/:id').get((req, res) => {
        const { id } = req.params;
        res.render('book', {
            book: books[id],
            title: 'Library',
            nav,
        });
    });

    return bookRouter;
};


module.exports = router;
