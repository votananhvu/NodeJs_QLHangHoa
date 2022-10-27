var db = require('mongoose')
db.connect('mongodb://127.0.0.1/quanlyhanghoa')
var hanghoaSchema = db.Schema({
  // tenmh: String, dongia: Number, hinhanh: String
  masp: Number, maloai: Number, name: String, thuonghieu: String, dongia: Number, img: String
}, {
  versionKey: false
})
var hanghoa = db.model('hanghoas', hanghoaSchema)
module.exports = hanghoa