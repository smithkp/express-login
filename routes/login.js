if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

var express = require('express');
var router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const users = require('./signup').users;

router.use(flash());

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

const passportInit = require('../passport-config');
passportInit(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

router.get('/', (req, res, next) =>{
    res.render('login');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureflash: true
}));

module.exports = router;
