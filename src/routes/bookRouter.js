const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
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

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;

            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected Successfully to server');

                    const db = client.db(dbName);
                    const col = db.collection('books');
                    const book = await col.findOne({ _id: new ObjectID(id) });
                    debug(book);
                    res.render('book', {
                        book,
                        nav,
                        title: 'Library',
                    });
                } catch (err) {
                    debug(err.stack);
                }
            }())
        });

    return bookRouter;
};


module.exports = router;
