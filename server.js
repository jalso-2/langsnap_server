require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const Sequelize = require('sequelize');

const PORT = process.env.PORT || 8080;
const sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports.sequelize = sequelize;
const server = express();
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// ///////////////////////// START MIDDLEWARE ///////////////////////////////

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('dev'));

// ///////////////////////// END MIDDLEWARE ////////////////////////////////


// ///////////////////////// START ENDPOINTS ///////////////////////////////

const User = require('./user/user_schema');
const Deck = require('./deck/deck_schema');
const Card = require('./card/card_schema');
const DeckCard = require('./deck_card/deck_card_schema');
const UserCard = require('./user_card/user_card_schema');

// Relationships
User.hasMany(Deck);
Card.belongsToMany(Deck, { through: DeckCard });
Card.belongsToMany(User, { through: UserCard });
Deck.belongsTo(User);

// Perform Sync
User.sync();
Deck.sync();
Card.sync();
DeckCard.sync();
UserCard.sync();

server.get('/', (req, res) => res.status(200).send('hello'));

server.post('/user', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  User.findOrCreate({ where: { email }, defaults: { firstName, lastName, username } })
    .then((suc) => {
      console.log(suc, 'this is success');
      res.status(200).send('Successfully added user to database');
    })
    .catch(err => console.error(err));
});

server.post('/userdeck', (req, res) => {
  const name = req.body.name;
  const userId = req.body.userId;
  const stars = 0;
  UserDeck.findOrCreate({ where: { name, userId, stars } })
    .then((suc) => {
      console.log(suc, 'this is success creating a user deck');
      res.status(200).send('Successfully added a new deck to database');
    })
    .catch(err => console.error(err));
});

server.post('/card', (req, res) => {
  const imgUrl = req.body.imgUrl;
  const deckId = req.body.deckId;
  const stars = 0;
  // Get the wordMap from proper API
  // After this, add the card to the UserDeck with id and add a UserCardInfo with the id
  // Add to join table??? think yes
});

// server.get('/v1/decks/deckid/*', (req, res) => {

// });

// ///////////////////////// END ENDPOINTS /////////////////////////////////
