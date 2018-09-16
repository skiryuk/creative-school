const config = {
  development: {
    database: {
      host:   '127.0.0.1',
      port:   '5432',
      db:     'creativeschool',
      user:   'postgres',
      pass:   'product',
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    secret: 'secretPwd',
    mail: {
      user: 'risuemperm59',
      pass: '***'
    }
  },
  production: {
    database: {
      host:   process.env.dbhost,
      port:   '5432',
      db:     process.env.dbname,
      user:   process.env.dbuser,
      pass:   process.env.dbpass,
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 30000
      }
    },
    secret: process.env.secretword,
    mail: {
      user: 'risuemperm59',
      pass: process.env.mailpass
    }
  }
};
module.exports = config;
