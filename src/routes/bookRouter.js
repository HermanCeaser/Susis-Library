const express = require('express');

const bookService = require('../services/goodReads');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

const router = (nav) => {
    const { getIndex, getById } = bookController(bookService, nav);
    
    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);

    return bookRouter;
};


module.exports = router;
