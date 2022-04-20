// Imports and Declarations
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var multer = require('multer');

//declaring config
const config = require('./config/globals');

// declaring routes
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var reviewsRouter = require('./routes/reviews');

// declaring passport and github auth
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;


var app = express();

// declaring path vars
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

// app secret for login with username and password
app.use(session({
  secret: 'w2022assignment',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());


// Here is process for github auth
passport.use(new githubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl
},
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ oauthId: profile.id });
    if (user) {
      return done(null, user);
    }
    else {
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      const savedUser = await newUser.save();
      return done(null, savedUser);
    }
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport process end

// Connecting controllers and views
app.use('/', indexRouter);
app.use('/reviews', reviewsRouter);
app.use('/books', booksRouter);
app.use(express.static("public/images"));

// Configuring and connecting to Database via config
let connectionString = config.db;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message)=> {
  console.log('Connection Success!');
})
.catch((error)=> {
  console.log(`Error while connecting ${reason}`);
});

// HBS Helper Method from class to select values from dropdown lists
const hbs = require('hbs');
hbs.registerHelper('createOption', (currentValue, selectedValue) => {
  var selectedProperty = '';
  if (currentValue == selectedValue) {
    selectedProperty = 'selected';
  }
  return new hbs.SafeString(`<option ${selectedProperty}>${currentValue}</option>`);
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
