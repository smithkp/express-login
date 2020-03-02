var express = require('express');
var router = express.Router();
var usersRouter = require('./user').router;
const methodOverride = require('method-override');




router.use('/user', usersRouter);
router.use(methodOverride('_method'));

/* GET home page. */
router.get('/', checkAuthenticated, (req, res) =>{
  res.render('index', {username: req.user.username});
});

router.delete('/logout', (req,res)=>{
  req.logOut();
  res.redirect('/user/login');
});

function checkAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/user/login');
  }
}

module.exports = router;
