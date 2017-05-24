const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;

const Deck = sequelize.define('deck', {
  name: {
    type: Sequelize.STRING,
  },
  stars: {
    type: Sequelize.INTEGER,
  },
}, {
  underscored: true,
});

module.exports = Deck;
