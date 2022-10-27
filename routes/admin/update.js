var express = require('express');
var router = express.Router();
var hanghoa = require('../../models/hanghoa.js');

router.get('*', (req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});
/*Sửa SP*/
router.route('/')
    .get(function (req, res, next) {
        if (res.locals.userId != undefined) {
            hh = {}
            res.render('edit_product.ejs', { hh });
        } else {
            res.redirect('/');
        }
    })
    .post(function (req, res, next) {
        hanghoa.findOne(
            { masp: req.body.masp }, //Kiểm tra masp từ form điền vào có trùng với masp trong db ko
            (error, hh) => {
                if (hh == undefined) { 
                    message = "lỗi sửa sản phẩm";
                    res.render('error.ejs', {message}); //thông báo lỗi
                } else {
                    if (!req.files || Object.keys(req.files).length === 0) {
                        hh.masp = req.body.masp;
                        hh.name = req.body.tenmh;
                        hh.thuonghieu = req.body.thuonghieu;
                        hh.dongia = req.body.dongia;
                        hh.save(error => res.redirect('/'));
                        return;
                    }
                    var hinh = req.files.hinhanh;
                    var duongdan = 'public/images/' + hinh.name;
                    hinh.mv(duongdan, function (err) {
                        if (err) return req.status(500).send(err)
                        hh.masp = req.body.masp;
                        hh.tenmh = req.body.tenmh;
                        hh.thuonghieu = req.body.thuonghieu;
                        hh.dongia = req.body.dongia;
                        hh.img= hinh.name;
                        return hh.save(error => res.redirect('/'));
                    });
                }
                
            });
    });

router.route('/:id')
    .get(function (req, res, next) {
        hanghoa.findOne({ masp: req.params.id },
            (error, hh) => {
                res.render('edit_product.ejs', { hh });
            })
    });

module.exports = router;



