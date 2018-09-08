module.exports = (sequelize, Sequelize) => {
  const Events = sequelize.define('events', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    description: {
      type: Sequelize.STRING
    },
    abonement: {
      type: Sequelize.BOOLEAN
    },
    price: {
      type: Sequelize.FLOAT
    },
    mime_type: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.BLOB('long')
    }
  });

  return Events;
};
