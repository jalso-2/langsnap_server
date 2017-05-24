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
const syncDb = async () => {
  await User.sync();
  await Deck.sync();
  await Card.sync();
  await UserCard.sync();
  await DeckCard.sync();
};
syncDb();

server.get('/', (req, res) => res.status(200).send('hello'));

server.post('/v1/user', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  try {
    const user = await User.findOrCreate({ where: { email }, defaults: { firstName, lastName, username } });
    return res.status(200).send(user[0]);
  } catch (err) {
    return console.error(err);
  }
});



// ///////////////////////// END ENDPOINTS /////////////////////////////////
