var express = require('express');
var router = express.Router();

var signupRouter = require('./signup').router;
var loginRouter = require('./login');

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { username: 'Smithyy140' });
});


module.exports = router;
