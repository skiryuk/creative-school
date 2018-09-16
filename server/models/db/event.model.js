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
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
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
