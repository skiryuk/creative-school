module.exports = (sequelize, Sequelize) => {
  const Reviews = sequelize.define('reviews', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.STRING
    }
  });

  return Reviews;
};
