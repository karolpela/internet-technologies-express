var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var klientRouter = require('./routes/klientRoute');
var sprzetRouter = require('./routes/sprzetRoute');
var wypozyczenieRouter = require('./routes/wypozyczenieRoute');

var klientApiRouter = require('./routes/api/KlientApiRoute');
var sprzetApiRouter = require('./routes/api/SprzetApiRoute');
var wypozyczenieApiRouter = require('./routes/api/WypozyczenieApiRoute');

var sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
  .catch(err => {
    console.log(err);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/klienci', klientRouter);
app.use('/sprzet', sprzetRouter);
app.use('/wypozyczenia', wypozyczenieRouter);

app.use('/api/klienci', klientApiRouter);
app.use('/api/sprzet', sprzetApiRouter);
app.use('/api/wypozyczenia', wypozyczenieApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
