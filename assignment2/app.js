var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var multer = require('multer');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

var fs = require('fs');
var path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use(express.static("public/images"));

let connectionString = 'mongodb+srv://admin:strongpassword2022@cluster0.xdojp.mongodb.net/projecttracker'
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message)=> {
  console.log('Connection Success!');
})
.catch((error)=> {
  console.log(`Error while connecting ${reason}`);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;