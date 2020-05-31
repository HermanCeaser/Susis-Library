const express = require('express');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
    {
        link: '/books',
        title: 'Books'
    },
    {
        link: '/authors',
        title: 'Authors'
    },
];

const bookRouter = require('./src/routes/bookRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

const authorRouter = express.Router();


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'susis-library', resave: false, saveUninitialized: false }));

// use our passport config
require('./src/config/passport')(app);

// Serve Our Static Files jquery, bootstrap, css and js
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/fonts/')));
app.use('/fonts', express.static(path.join(__dirname, '/public/fonts/')));
app.use('/images', express.static(path.join(__dirname, '/images/')));

//  set app Settings
app.set('views', './src/views');
app.set('view engine', 'ejs');


authorRouter.route('/').get((req, res) => {
    res.send('These are my authors');
});


//  get Requests and send Responses.
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/authors', authorRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Library',
        nav,
    });
});

app.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Susis Library',
        nav,
    });
});

app.get('/signin', (req, res) => {
    res.render('signin', {
        title: 'Susis Library',
        nav,
    });
});


app.listen(port, () => (
    debug(`Listening on Port  + ${chalk.blue(port)}`)
));
