const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;
const User = require('../user/user_schema');
const Card = require('../card/card_schema');

const UserCardInfo = sequelize.define('userCardInfo', {
  lastVisited: {
    type: Sequelize.DATE,
  },
  timeInterval: {
    type: Sequelize.INTEGER,
  },
  phrase: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  cardId: {
    type: Sequelize.INTEGER,
  },
}, {
  classMethods: {
    associate: (models) => {
      User.hasMany(models.UserCardInfo, { foreignKey: 'userId' });
      Card.hasMany(models.UserCardInfo, { foreignKey: 'cardId' });
    },
  },
});
UserCardInfo.sync();

module.exports.UserCardInfo = UserCardInfo;
