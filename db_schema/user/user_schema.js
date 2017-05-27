const Sequelize = require('sequelize');
const sequelize = require('../../server').sequelize;

const User = sequelize.define('user', {
  facebookUsername: {
    type: Sequelize.STRING,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
  },
  nativeLang: {
    type: Sequelize.STRING,
  },
  learnLang: {
    type: Sequelize.STRING,
  },
}, {
  underscored: true,
});

module.exports = User;
