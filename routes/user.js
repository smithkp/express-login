if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');

const users = [];

const passportInit = require('../passport-config');
passportInit(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

router.use(flash());

router.use(passport.initialize());
router.use(passport.session());

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.get('/signup', (req, res, next) =>{
    res.render('signup');
});

router.get('/login', (req, res, next) =>{
    res.render('login');
});

router.post('/signup', async (req, res) =>{
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        res.redirect('/user/login');
    } catch (e) {
        res.redirect('/user/signup');
    }
    console.log(users);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

module.exports = router;
