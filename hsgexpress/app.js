const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/dbConfig');

const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/userRoutes');
const gamesRouter = require('./routes/gameRoutes');
const teamsRouter = require('./routes/teamRoutes');
const authRouter = require('./routes/authRoutes')

let app = express();

// database connection
mongoose.connect(dbConfig.uri);
mongoose.Promise = global.Promise;

//database error handler
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', indexRouter);
app.use('/v1/user', usersRouter);
app.use('/v1/game', gamesRouter);
app.use('/v1/team', teamsRouter);
app.use('/v1/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
