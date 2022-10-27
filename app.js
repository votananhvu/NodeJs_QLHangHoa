var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var insertRouter = require('./routes/admin/insert');
var updateRouter = require('./routes/admin/update');
var deleteRouter = require('./routes/admin/delete');
var searchRouter = require('./routes/admin/search');
var registerRouter = require('./routes/admin/register');
var loginRouter = require('./routes/admin/login');
var usersRouter = require('./routes/users');
var expressSession = require('express-session');

const fileUpload = require('express-fileupload');

var app = express();
app.use(fileUpload());
app.use(expressSession({secret: 'secret', resave: true, saveUninitialized: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dangky', registerRouter);
app.use('/dangnhap', loginRouter);
app.use('/them', insertRouter);
app.use('/sua', updateRouter);
app.use('/xoa', deleteRouter);
app.use('/tim', searchRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
