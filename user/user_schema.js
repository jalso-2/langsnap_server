const Sequelize = require('sequelize');
const sequelize = require('../server').sequelize;

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  token: {
    type: Sequelize.STRING
  },
  nativeLang: {
    type: Sequelize.STRING
  },
  learnLang: {
    type: Sequelize.STRING
  }
});
User.sync();

module.exports = User;
