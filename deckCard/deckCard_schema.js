const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;

const DeckCard = sequelize.define('deckCard', {
  cardId: {
    type: Sequelize.INTEGER,
  },
  deckId: {
    type: Sequelize.INTEGER,
  },
});
DeckCard.sync();

module.exports.DeckCard = DeckCard;
