var express = require('express');
var router = express.Router();

var usersRouter = require('./user');


router.use('/user', usersRouter);

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { username: 'Smithyy140' });
});


module.exports = router;
