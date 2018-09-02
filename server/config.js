const config = {
  development: {
    database: {
      host:   '127.0.0.1',
      port:   '5432',
      db:     'creativeschool',
      user:   'postgres',
      pass:   'product'
    }
  },
  production: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db:   'site'
    }
  }
};
module.exports = config;
