if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');

const users =[];

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());



router.get('/', (req, res, next) =>{
    res.render('signup');
});

router.post('/', async (req, res) =>{
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        res.redirect('/login');
    } catch (e) {
        res.redirect('/signup');
    }
        console.log(users);
});

module.exports = {
    router: router,
    users: users
};


