var express = require('express');
var router = express.Router();
var hanghoa = require('../../models/hanghoa.js');

router.get('*', (req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});
/*Thêm SP*/
router.route('/')
    .get(function (req, res, next) {
        if (res.locals.userId != undefined) {
            res.render('add_product.ejs');
        } else {
            res.redirect('/');
        }
    })
    .post(function (req, res, next) { 
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        var hinh = req.files.hinhanh;
        var duongdan = 'public/images/' + hinh.name;
        hinh.mv(duongdan, function (err) {
            if (err) return res.status(500).send(err);
            var masp_post = req.body.masp;
            
            hanghoa.findOne(
                { masp: req.body.masp },
                (error, hh) => {
                    if (hh != undefined) { //Kiểm tra mã sản phẩm đã tồn tại trong database chưa?
                        message = "lỗi thêm sản phẩm";
                        res.render('error.ejs', {message});
                    } else {
                        var hh = new hanghoa({
                            masp: req.body.masp,
                            name: req.body.tenmh,
                            thuonghieu: req.body.thuonghieu,
                            dongia: req.body.dongia,
                            img: hinh.name
                            
                        });
                        hh.save(error => res.redirect('/'));
                    }
                })
            // var hh = new hanghoa({
            //     masp: req.body.masp,
            //     name: req.body.tenmh,
            //     thuonghieu: req.body.thuonghieu,
            //     dongia: req.body.dongia,
            //     img: hinh.name
            // })
            // hh.save(error => res.redirect('/'))
        });
    });

module.exports = router;