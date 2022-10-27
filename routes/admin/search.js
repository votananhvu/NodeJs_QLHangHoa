var express = require('express');
var router = express.Router();
var hanghoa = require('../../models/hanghoa.js');

router.get('*', (req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});
/*Tìm kiếm*/
router.route('/')
    .get(function (req, res, next) {
        if (res.locals.userId == undefined) {
            res.render('login.ejs');
        } else {
            res.render('search_product.ejs');
        }

    })
    .post(function (req, res, next) {
        if (res.locals.userId == undefined) {
            hanghoa.find({
                name: { $regex: req.body.tenmh, $options: 'i' }
            }, (error, dshh) => {
                res.render('search_result.ejs', { dshh, timkiem: true });
            })
        } else {
            res.render('login.ejs');
        }

    });


module.exports = router;