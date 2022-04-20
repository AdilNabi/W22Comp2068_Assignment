//Imports
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// GET home page
router.get('/', function (req, res, next) {
  res.render('index');
});

// GET for login
router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { title: 'Login', messages: messages });
});

// POST for login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureMessage: 'Invalid credentials'
}));

// GET for register
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Create a new account' });
});

//POST for register
router.post('/register', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect('/register');
      }
      else {
        req.login(newUser, (err) => {
          res.redirect('/books');
        });
      }
    });
});

// GET for logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

// GET for github
router.get('/github', passport.authenticate('github', { scope: ['user.email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => { res.redirect('/books') }
);

module.exports = router;