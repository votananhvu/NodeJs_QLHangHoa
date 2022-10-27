var express = require('express');
var router = express.Router();
var User = require('../../models/user.js');

router.get('*', (req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});
/*Đăng kí*/
router.route('/')
.get(function(req, res, next) {
  res.render('register.ejs');
})
.post(function(req, res, next) {
    var nguoidung = new User({
        username: req.body.username,
        password: req.body.password
    })
    nguoidung.save(error => res.render('/error.ejs'));
});

module.exports = router;