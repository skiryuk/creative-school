const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const http = require('http');

const logger = require('morgan');
const bodyParser = require('body-parser');
const authApi = require('./routers/auth.router');
const imagesApi = require('./routers/image.router');
const eventsApi = require('./routers/event.router');
const reviewsApi = require('./routers/review.router');
const mailApi = require('./routers/mail.router');


///////////////////////
// Server Middleware
///////////////////////

app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.static(__dirname + '/../dist'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Passport
app.use(passport.initialize());

//////////////////
// API Queries
//////////////////

app.use('/api/images', imagesApi);
app.use('/api/auth', authApi);
app.use('/api/events', eventsApi);
app.use('/api/reviews', reviewsApi);
app.use('/api/mail', mailApi);

//////////////////
// Static Query
//////////////////

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/../dist/index.html'));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('\n' + '**********************************');
  console.log('REST API Running');
  console.log('**********************************' + '\n');

  if (process.env.NODE_ENV === "production") {
    function startKeepAlive() {
      setInterval(() => {
        const options = {
          host: 'creativeschool.herokuapp.com',
          port: 80,
          path: '/'
        };
        http.get(options, (res) => {
          res.on('data', (chunk) => {
            try {
            } catch (err) {
              console.log(err.message);
            }
          });
        }).on('error', function (err) {
          console.log("Error: " + err.message);
        });
      }, 10 * 60 * 1000);
    }

    startKeepAlive();
  }
});

////////////////////
// Error Handlers
////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use(function(err, req, res, next) {
    res.status(500)
      .json({
        status: 'error',
        message: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(500)
    .json({
      status: 'error',
      message: err.message
    });
});


module.exports = app;
