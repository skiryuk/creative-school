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
    secret: 'secretPwd'
  },
  production: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db:   'site'
    },
    secret: 'secretPwd'
  }
};
module.exports = config;
