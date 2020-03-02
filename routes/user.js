if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');

const users = [];

router.use(flash());



router.get('/signup', checkUnauthenticated,(req, res, next) =>{
    res.render('signup');
});

router.get('/login', checkUnauthenticated,(req, res, next) =>{
    res.render('login');
});

router.post('/signup', checkUnauthenticated, async (req, res) =>{
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        res.redirect('/user/login');
    } catch {
        res.redirect('/user/signup');
    }
    console.log(users);
});

router.post('/login', checkUnauthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

function checkUnauthenticated(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/')
    } else {
        next();
    }
}

module.exports = {
    router: router,
    users: users
};
