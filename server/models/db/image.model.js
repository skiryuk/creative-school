module.exports = (sequelize, Sequelize) => {
  const Images = sequelize.define('images', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.BLOB('long')
    }
  });

  return Images;
};
