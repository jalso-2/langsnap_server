const Sequelize = require('sequelize');
const sequelize = require('../../server').sequelize;

const DeckCard = sequelize.define('deck_card', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lastVisited: {
    type: Sequelize.DATE,
  },
  timeInterval: {
    type: Sequelize.INTEGER,
  },
  phrase: {
    type: Sequelize.STRING,
  },
}, {
  underscored: true,
});

module.exports = DeckCard;
