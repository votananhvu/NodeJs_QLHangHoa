var express = require('express');
var router = express.Router();
var User = require('../../models/user.js');
var bcrypt = require('bcrypt');

router.get('*', (req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});
/*Đăng nhập*/
router.route('/')
  .get(function (req, res, next) {
    if (res.locals.userId == undefined) {
      res.render('login.ejs');
    } else {
      res.redirect('/');
    }

  })
  .post(function (req, res, next) {
    User.findOne({
      username: req.body.username
    }, (error, nguoidung) => {
      if (nguoidung) {
        bcrypt.compare(req.body.password, nguoidung.password, (error, same) => {
          if (same) {
            req.session.userId = nguoidung._id;
            res.redirect('/');
          } else {
            res.redirect('/dangnhap');
          }
        });

      } else {
        res.redirect('/dangnhap');
      }
    })
  });

module.exports = router;