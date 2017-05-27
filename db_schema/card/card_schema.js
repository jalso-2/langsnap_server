const Sequelize = require('sequelize');
const sequelize = require('../../server').sequelize;

const Card = sequelize.define('card', {
  imgUrl: {
    type: Sequelize.STRING,
  },
  wordMap: {
    type: Sequelize.JSONB,
  },
  stars: {
    type: Sequelize.INTEGER,
  },
}, {
  underscored: true,
});

module.exports = Card;
