var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

var app = express();

// view engine setup
var hbs = require('hbs');
app.set('views', path.join(__dirname, 'views'));
//https://github.com/pillarjs/hbs#use
app.set('view engine', 'hbs');
// hbs engine is set to require('hbs')__express by default,line only necessary if using different engine than 'hbs', or different extension (i.e. html)
//   app.engine('hbs', hbs.__express);
//https://stackoverflow.com/questions/26871522/how-to-change-default-layout-in-express-using-handlebars

//layout.hbs is the default layout, but you can change it globally with this here
//   app.set('view options', { layout: 'layout' }); 

//Register partials in particular directory
hbs.registerPartials(__dirname + '/views/partials', function (err) {;});
//TODO setup any additional helpers and partials


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

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
