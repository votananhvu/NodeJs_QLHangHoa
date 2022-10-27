const { response } = require('express');
var express = require('express');
var router = express.Router();
var hanghoa = require('../models/hanghoa.js');

router.get('*', (req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

router.get('/', (req, res, next) => {
  if (res.locals.userId == undefined) {
    res.render('login.ejs');
  } else {
    res.redirect('/1');
  }

})

//Phân trang
router.get('/', (req, res, next) => {
  res.redirect('/1');
});

router.get('/:page', function (req, res, next) {
    let perPage = 4;
    let page = req.params.page || 1;

    hanghoa
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((error, dshh) => {
        hanghoa.countDocuments((error, count) => {
          if (error) return next(error);
          res.render('product.ejs', {
            dshh,
            current: page,
            pages: Math.ceil(count / perPage),
            timkiem: false
          });
        });
      });
});

module.exports = router;
