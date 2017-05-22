const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;

const UserDeck = sequelize.define('userDeck', {
  name: {
    type: Sequelize.STRING,
  },
  stars: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
}, {
  classMethods: {
    associate: (models) => {
      UserDeck.belongsTo(models.User, { foreignKey: 'userId' });
    },
  },
});
UserDeck.sync();

module.exports.UserDeck = UserDeck;
