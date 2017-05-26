const server = require('../server').server;
const dbHelpers = require('../db_helpers/db_helpers');
const Card = require('../card/card_schema');
const Deck = require('../deck/deck_schema');

server.get('/', (req, res) => res.status(200).send('hello'));

server.post('/v1/users', (req, res) => { // goodish, should this be createOrUpdate???
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const token = req.body.token;
  return dbHelpers.findOrCreateUser(firstName, lastName, username, email, token, res);
});

server.post('/v1/users/addlang', (req, res) => { // good!
  const id = req.body.id;
  const nativeLang = req.body.nativeLang;
  const learnLang = req.body.learnLang;
  return dbHelpers.userAddLanguageInfo(id, nativeLang, learnLang, res);
});

server.get('/v1/decks/all', (req, res) => dbHelpers.getAllDecks(res)); // good!

server.get('/v1/decks/deckid/*', (req, res) => {  // good!
  const id = +req.params[0];
  return dbHelpers.getDeckByDeckId(id, res);
});

server.get('/v1/decks/userid/*', (req, res) => {  // good!
  const id = +req.params[0];
  return dbHelpers.getDeckByUserId(id, res);
});

server.get('/v1/cards/all', (req, res) => dbHelpers.getAllCards(res));

server.get('/v1/cards/deckid/*', async (req, res) => {  // good!
  const id = +req.params[0];
  try {
    const deck = await Deck.findAll({
      include: [{
        model: Card,
        attributes: ['id', 'imgUrl', 'wordMap', 'stars'],
        through: { attributes: ['lastVisited', 'timeInterval', 'phrase'] },
      }],
      where: { id },
      attributes: ['id', 'name'],
    });
    return res.status(200).send(deck);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.post('/v1/decks/new', (req, res) => {  // good!
  const name = req.body.name;
  const user_id = req.body.user_id;
  const stars = req.body.stars;
  return dbHelpers.userCreateNewDeck(name, user_id, stars, res);
});

server.post('/v1/cards/addcard', (req, res) => { // works, condense, default join table
  const user_id = req.body.user_id;
  const imgUrl = req.body.imgUrl;
  const wordMap = req.body.wordMap;
  const deck_id = req.body.deck_id;
  return dbHelpers.userAddCreatedCardToDeck(user_id, imgUrl, wordMap, deck_id, res);
});

server.post('/v1/decks/adddecks', async (req, res) => {
  const user_id = req.body.id;
  const decks = JSON.parse(req.body.decks);
  const createdDecksOutput = [];
  await Promise.all(decks.map(async (deckId) => {
    try {
      const originalDeck = await Deck.findOne({ where: { id: deckId } });
      const name = originalDeck.name;
      try {
        const createdDeck = await Deck.create({ user_id, name, stars: 0 });
        return createdDecksOutput.push(createdDeck);
      } catch (err) {
        return res.status(400).send(err);
      }
    } catch (error) {
      return res.status(400).send('error');
    }
  }));
  return res.status(200).send(createdDecksOutput);
});

server.post('/v1/decks/addcards', async (req, res) => {  // need to FIX!!!, should add user spec info to join table!!!!
  const deckId = req.body.deckId;
  const cardIdsArr = JSON.parse(req.body.cardIds);
  try {
    await dbHelpers.createCardsForDeckByCardIds(deckId, cardIdsArr, res);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).send(err);
  }
});

server.delete('/v1/decks/*', async (req, res) => {  // good!
  const id = +req.params[0];
  return dbHelpers.deleteDeckById(id, res);
});

server.delete('/v1/cards/*', async (req, res) => {  // good!
  const id = req.params[0];
  return dbHelpers.deleteCardById(id, res);
});