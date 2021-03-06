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
    mimeType: {
      type: Sequelize.STRING,
      field: 'mime_type'
    },
    data: {
      type: Sequelize.BLOB('long')
    },
    hasImage: {
      type: Sequelize.BOOLEAN,
      field: 'has_image'
    }
  });

  return Events;
};
