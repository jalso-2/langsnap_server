const Sequelize = require('sequelize');
const sequelize = require('../../server').sequelize;

const UserCard = sequelize.define('user_card', {}, { underscored: true });

module.exports = UserCard;
