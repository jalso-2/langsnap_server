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

server.post('/v1/users', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const token = req.body.token;
  try {
    const user = await User.findOrCreate({ where: { email }, defaults: { firstName, lastName, username, token } });
    return res.status(200).send(user[0]);
  } catch (err) {
    return console.error(err);
  }
});

server.post('/v1/users/addlang', async (req, res) => {
  const id = req.body.id;
  const nativeLang = req.body.nativeLang;
  const learnLang = req.body.learnLang;
  try {
    const numUpdated = await User.update({ nativeLang, learnLang }, { where: { id } });
    if (!numUpdated[0] === 1) {
      return res.status(400).send('Failed to modify user');
    }
    try {
      const user = await User.findOne({ where: { id } });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.get('/v1/decks/all', async (req, res) => {  // need to test!
  try {
    const decks = await Deck.findAll();  // need to add imgUrl with join on card
    return res.status(200).send(decks);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.get('/v1/decks/deckid/*', async (req, res) => {  // need to test!
  const id = +req.params[0];
  try {
    const decks = await Deck.findAll({ where: { id } });  // need to add imgUrl with join on card
    return res.status(200).send(decks);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.get('/v1/decks/userid/*', async (req, res) => {  // need to test!
  const id = +req.params[0];
  try {
    const decks = await Deck.findAll({ where: { user_id: id } });
    return res.status(200).send(decks);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.get('/v1/cards/all', async (req, res) => {  //need to test!
  try {
    const cards = await Card.findAll();
    return res.status(200).send(cards);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.get('/v1/cards/deckid/*', async (req, res) => {  // need to test!
  const deck_id = +req.params[0];
  try {
    const deck = await Deck.findAll({
      include: [{
        model: Card,
        where: { deck_id },
      }],
    });
    console.log(deck, 'what is this!?!?!?');
    return res.status(200).send(deck);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.get('/v1/cards/userid/*', async (req, res) => { // need to test!
  const user_id = req.params[0];
  try {
    const cards = await Card.findAll({
      include: [{
        model: User,
        through: { where: { user_id } },
      }],
    });
    return res.status(200).send({ cards });
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.post('/v1/decks/new', async (req, res) => {  // need to test!!
  const name = req.body.name;
  const user_id = req.body.id;
  const stars = req.body.stars;
  try {
    const deck = await Deck.create({ name, user_id, stars });
    return res.status(200).send(deck);
  } catch (err) {
    return res.status(400).send(err);
  }
});




// ///////////////////////// END ENDPOINTS /////////////////////////////////
