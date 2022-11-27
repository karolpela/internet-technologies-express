var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customerRoute');
var equipmentRouter = require('./routes/equipmentRoute');
var rentalRouter = require('./routes/rentalRoute');

var customerApiRouter = require('./routes/api/customerApiRoute');
var equipmentApiRouter = require('./routes/api/equipmentApiRoute');
var rentalApiRouter = require('./routes/api/rentalApiRoute');

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
app.use('/customers', customerRouter);
app.use('/equipment', equipmentRouter);
app.use('/rentals', rentalRouter);

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
