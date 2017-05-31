const Sequelize = require('sequelize');
const sequelize = require('../../server').sequelize;

const UserCard = sequelize.define('user_card', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, { underscored: true });

module.exports = UserCard;
