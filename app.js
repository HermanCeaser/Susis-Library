const express = require('express');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./src/routes/bookRouter');
const authorRouter = express.Router();

app.use(morgan('tiny'));

//  Serve Our Static Files jquery, bootstrap, css and js
app.use(express.static(path.join(__dirname, '/public/')));

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/fonts/')));

//  set app Settings
app.set('views', './src/views');
app.set('view engine', 'ejs');



authorRouter.route('/').get((req, res) => {
    res.send('These are my authors');
});


//  get Requests and send Responses.
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Library',
        nav: [
            {
                link: '/books',
                title: 'Books'
            },
            {
                link: '/authors',
                title: 'Authors'
            },
        ],
    });
});


app.listen(port, () => (
    debug(`Listening on Port  + ${chalk.blue(port)}`)
));
