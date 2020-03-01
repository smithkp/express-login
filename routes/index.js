var express = require('express');
var router = express.Router();
var usersRouter = require('./user').router;



router.use('/user', usersRouter);

/* GET home page. */
router.get('/', (req, res) =>{
  res.render('index', {username: req.user.username});
});


module.exports = router;
