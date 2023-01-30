var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const wypozyczenieRouter = require('./routes/wypozyczenieRoute')
const czytelnikRouter = require('./routes/czytelnikRoute')
const ksiazkaRouter = require('./routes/ksiazkaRoute')
const authApiRouter = require('./routes/api/AuthApiRoute');
const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err =>{console.log(err)});

var app = express();




// app.use((req, res, next) =>{
//   const loggedUser = req.session.loggedUser;
//   res.locals.loggedUser = loggedUser;
//   if(!res.locals.loginError) {
//     res.locals.loginError = undefined;
//   }
// })

const czytelnikApiRouter = require('./routes/api/CzytelnikApiRoute');
const ksiazkaApiRouter = require('./routes/api/KsiazkaApiRoute');
const wypozyczenieApiRouter = require('./routes/api/WypozyczenieApiRoute');
// const cors = require("cors");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const session = require('express-session');
const authUtils = require("./util/authUtils");
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use('/api/auth', authApiRouter);

app.use('/', indexRouter);
app.use('/wypozyczenie', wypozyczenieRouter);
app.use('/czytelnik', czytelnikRouter);
app.use('/ksiazka', ksiazkaRouter);

app.use('/api/czytelnik', czytelnikApiRouter);
app.use('/api/ksiazka', ksiazkaApiRouter);
app.use('/api/wypozyczenie', wypozyczenieApiRouter);

// app.use('/wypozyczenie', authUtils.permitAuthenticatedUser, wypozyczenieRouter);
// app.use('/czytelnik', authUtils.permitAuthenticatedUser, czytelnikRouter);
// app.use('/ksiazka', authUtils.permitAuthenticatedUser, ksiazkaRouter);
//
// app.use('/api/czytelnik', authUtils.permitAuthenticatedUser, czytelnikApiRouter);
// app.use('/api/ksiazka', authUtils.permitAuthenticatedUser, ksiazkaApiRouter);
// app.use('/api/wypozyczenie', authUtils.permitAuthenticatedUser, wypozyczenieApiRouter);
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
