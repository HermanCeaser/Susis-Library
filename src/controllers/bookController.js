const {
    MongoClient,
    ObjectId
} = require('mongodb');

const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
    function getIndex(req, res) {
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
                    user: req.user,
                });
            } catch (err) {
                debug(err.stack);
            }
            // close connection
            client.close();
        }());
    }

    function getById(req, res) {
        const {
            id
        } = req.params;

        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected Successfully to server');

                const db = client.db(dbName);
                const col = db.collection('books');
                const book = await col.findOne({
                    _id: new ObjectID(id)
                });

                book.details = await bookService.getBookById(book.bookId);
                debug(book);

                res.render('book', {
                    book,
                    nav,
                    title: 'Library',
                    user: req.user,
                });
            } catch (err) {
                debug(err.stack);
            }
        }());
    }

    return {
        getById,
        getIndex
    };
}

module.exports = bookController;
