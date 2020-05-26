const express = require('express');
const debug = require('debug')('app:bookRouter');
const connection = require('../db')(debug);

const bookRouter = express.Router();

const router = (nav) => {
    const books = [{
        id: 1,
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        read: false
    },
    {
        id: 2,
        title: 'Life On The Mississipi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        id: 3,
        title: 'Bill  Clinton',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: true
    },
    {
        id: 4,
        title: 'Think And Grow Rich',
        genre: 'Entrepreneurship',
        author: 'Napolean Hill',
        read: false
    },
    {
        id: 5,
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        id: 6,
        title: 'Rich Dad Poor Dad',
        genre: 'Fiction',
        author: 'Napolean Hill',
        read: false
    },
    ];

    bookRouter.route('/').get((req, res) => {
        connection.query('SELECT * FROM books', (err, results) => {
            if (err) {
                debug(`Error occurred ${err.stack}`);
            }

            debug(results);
            res.render('books', {
                books: results,
                title: 'Library',
                nav,
            });
        });
    });

    bookRouter.route('/:id').get((req, res) => {
        const {
            id
        } = req.params;
        connection.query('SELECT * FROM books WHERE `id` = ?', [id], (err, result) => {
            if (err) {
                debug(`Error Ocurred: ${err.stack}`);
            }

            debug(result);
            res.render('book', {
                book: result[0],
                title: 'Library',
                nav,
            });
        });
    });

    return bookRouter;
};


module.exports = router;
