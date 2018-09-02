const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const env = process.env.NODE_ENV || "development";
const config = require('./config')[env];

const pgp = require('pg-promise')(options);
const connectionString = `postgres://${config.database.user}:${config.database.pass}@${config.database.host}:${config.database.port}/${config.database.db}`;
const db = pgp(connectionString);

const pgCamelCase = require('pg-camelcase');
const revertCamelCase = pgCamelCase.inject(pgp.pg);


/////////////////////
// Query Functions
/////////////////////

function getReviews(req, res, next) {
  db.any('select * from reviews')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: ''
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/////////////
// Exports
/////////////

module.exports = {
  getReviews: getReviews
};
