if (!process.env.PORT) {
  require('dotenv').config()
  process.env.NODE_ENV = "dev"
}

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petes-pets');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connecting the stripe key 
app.locals.PUBLIC_STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY

require('./routes/index.js')(app);
require('./routes/pets.js')(app);


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// SEND EMAIL
const user = {
  email: 'sukhrobjon.golibboev@students.makeschool.com',
  name: 'Sukhrobjon',
  age: '23'
};


module.exports = app;
