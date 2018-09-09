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
      pass: 'QSXaz#2018'
    }
  },
  production: {
    database: {
      host:   'ec2-54-217-235-137.eu-west-1.compute.amazonaws.com',
      port:   '5432',
      db:     'devhl2o45oab5a',
      user:   'sloulosiulsgas',
      pass:   '692746b1a2fc354a774c2e1a9005e1a122566d60032f32798de1f318855a91be',
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    secret: 'creativeSecret',
    mail: {
      user: 'risuemperm59',
      pass: 'QSXaz#2018'
    }
  }
};
module.exports = config;
