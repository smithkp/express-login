var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) =>{
    res.render('signup');
});

router.post('/signup', (req, res) =>{

});

module.exports = router;
