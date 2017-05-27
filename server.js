require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const Sequelize = require('sequelize');
const bluebird = require('bluebird');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const PORT = process.env.PORT || 8080;
const sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports.sequelize = sequelize;
const server = express();
const routes = require('./routes');

// ///////////////////////// START MIDDLEWARE ///////////////////////////////
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(cookieParser());
server.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true,
}));
server.use('/', routes);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
// ///////////////////////// END MIDDLEWARE ////////////////////////////////





// ///////////////////////// START DATABASE RELATIONSHIPS ///////////////////
const User = require('./user/user_schema');
const Deck = require('./deck/deck_schema');
const Card = require('./card/card_schema');
const DeckCard = require('./deck_card/deck_card_schema');
const UserCard = require('./user_card/user_card_schema');

// Relationships
User.hasMany(Deck, { onDelete: 'CASCADE' });
Card.belongsToMany(Deck, { onDelete: 'CASCADE', through: DeckCard });
Card.belongsToMany(User, { onDelete: 'CASCADE', through: UserCard });
Deck.belongsTo(User, { onDelete: 'CASCADE' });
Deck.belongsToMany(Card, { onDelete: 'CASCADE', through: DeckCard });
User.belongsToMany(Card, { onDelete: 'CASCADE', through: UserCard });

// Perform sync of models with existing database models


const syncDb = async () => {
  await User.sync();
  await Deck.sync();
  await Card.sync();
  await UserCard.sync();
  await DeckCard.sync();
};
syncDb();
