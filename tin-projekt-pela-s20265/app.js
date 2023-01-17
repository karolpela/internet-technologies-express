var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var session = require('express-session');
var authApiRouter = require('./routes/api/authApiRoute');

app.use(
    session({
        secret: 'password',
        resave: false,
        saveUninitialized: true
    })
);

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});
var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customerRoute');
var equipmentRouter = require('./routes/equipmentRoute');
var rentalRouter = require('./routes/rentalRoute');

var customerApiRouter = require('./routes/api/customerApiRoute');
var equipmentApiRouter = require('./routes/api/equipmentApiRoute');
var rentalApiRouter = require('./routes/api/rentalApiRoute');

var authUtil = require('./util/authUtil');
var cors = require('cors');

var sequelizeInit = require('./config/sequelize/init');
const { util } = require('prettier');
sequelizeInit().catch((err) => {
    console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));

var i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true,
    defaultLocale: 'pl',
    cookie: 'rental-shop-lang'
});
app.use(i18n.init);

app.use(express.static(path.join(__dirname, 'public')));

// set language from cookie
app.use((req, res, next) => {
    if (!res.locals.lang) {
        const currentLang = req.cookies['rental-shop-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use('/', indexRouter);
app.use('/api/auth', authApiRouter);

app.use('/customers', customerRouter);
app.use('/equipment', equipmentRouter);
app.use('/rentals', authUtil.permitAuthenticatedUser, rentalRouter);

app.use('/api/customers', customerApiRouter);
app.use('/api/equipment', equipmentApiRouter);
app.use('/api/rentals', rentalApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
