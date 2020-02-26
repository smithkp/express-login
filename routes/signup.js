const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users =[];



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

module.exports = router;
