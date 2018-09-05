const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pass: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Users.prototype.validPassword = function(pass) {
    return bcrypt.compareSync(pass, this.pass)
  };

  return Users;
};
