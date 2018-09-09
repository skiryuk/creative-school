
const env = process.env.NODE_ENV || "development";
const dbConfig = require('./config/config')[env]["database"];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.pass, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require('./models/db/image.model.js')(sequelize, Sequelize);
db.users = require('./models/db/user.model.js')(sequelize, Sequelize);
db.events = require('./models/db/event.model.js')(sequelize, Sequelize);
db.reviews = require('./models/db/review.model.js')(sequelize, Sequelize);

module.exports = db;
