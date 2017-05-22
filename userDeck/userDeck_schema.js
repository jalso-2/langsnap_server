const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;
const User = require('../user/user_schema');

const UserDeck = sequelize.define("userDeck", {
  name: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  }
}, {
  classMethods: {
    associate: function(models) {
      UserDeck.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
});
UserDeck.sync();

module.exports.UserDeck = UserDeck;
