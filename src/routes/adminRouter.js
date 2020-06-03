const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();
const books = [
    {
        title: 'The Wind in the Willows',
        bookId: 25,
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        read: false
    },
    {
        title: 'Life On The Mississipi',
        bookId: 27,
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'Bill  Clinton',
        bookId: 28,
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: true
    },
    {
        title: 'Think And Grow Rich',
        bookId: 30,
        genre: 'Entrepreneurship',
        author: 'Napolean Hill',
        read: false
    },
    {
        title: 'War and Peace',
        bookId: 50,
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Rich Dad Poor Dad',
        bookId: 59,
        genre: 'Fiction',
        author: 'Napolean Hill',
        read: false
    },
];

const router = (nav) => {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected to the server "http://localhost:27017" successfully');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });

    return adminRouter;
};

module.exports = router;
