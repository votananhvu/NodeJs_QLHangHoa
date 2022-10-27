var express = require('express');
var router = express.Router();
var hanghoa = require('../../models/hanghoa.js');

router.get('*', (req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});
/*Xóa SP*/
router.route('/')
    .get(function (req, res, next) {
        if (res.locals.userId != undefined) {
            res.render('delete_product.ejs');
        } else {
            res.redirect('/');
        }   
    })
    .post(function (req, res, next) {
        hanghoa.deleteOne({
            masp: req.body.masp
            // name: req.body.tenmh
        }, error => res.redirect('/'))
    });

router.route('/:id')
    .get(function (req, res, next) {
        hanghoa.deleteOne({
            _id: req.params.id
        }, error => res.redirect('/'))
    });

module.exports = router;