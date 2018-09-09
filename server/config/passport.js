const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../db.js');
const env = process.env.NODE_ENV || "development";
const config = require('./config')[env];

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  opts.ignoreExpiration = false;
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    db.users.find({
      where: {
        id: jwtPayload.id
      }
    })
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err, false));
  }));
};
