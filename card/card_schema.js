const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;
const UserDeck = require('../userDeck/userDeck_schema');

const Card = sequelize.define("Card", {
  imgUrl: {
    type: Sequelize.STRING
  },
  wordMap: {
    type: Sequelize.JSONB
  },
  stars: {
    type: Sequelize.INTEGER
  }
}, {
  classMethods: {
    associate: function(models) {
      Card.belongsToMany(models.UserDeck, { through: 'DeckCard' }),
      UserDeck.belongsToMany(models.Card, { through: 'DeckCard' })
    }
  }
});
Card.sync();

module.exports.Card = Card;
