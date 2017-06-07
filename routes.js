const express = require('express');

const router = express.Router();
const dbHelpers = require('./db_schema/db_helpers_fxns');
const apiHelpers = require('./api_helpers/api_helpers');
const Card = require('./db_schema/card/card_schema');
const Deck = require('./db_schema/deck/deck_schema');
const User = require('./db_schema/user/user_schema');
const DeckCard = require('./db_schema/deck_card/deck_card_schema');

router.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  return res.sendStatus(200);
});

router.get('/', (req, res) => res.status(200).send('hello'));

router.post('/v2/*', (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
});

router.get('/v1/users/everything', async (req, res) => {
  const data = await dbHelpers.userGetItAll();
  if (data instanceof Error) {
    return res.status(400).send(data);
  }
  return res.status(200).send(data);
});

router.post('/v1/cloudinaryurltogoogle', async (req, res) => {
  if (!req.body || !req.body.url) {
    return res.status(400).send('Invalid url in body of request');
  }
  const url = req.body.url;
  const result = await apiHelpers.sendUrlToGoogleVisionForName(url);
  return typeof result === 'string' ? res.status(400).send('Error, Google Vision did not handle your request properly') : res.status(200).send(result);
});

router.post('/v1/googleocr', async (req, res) => {
  if (!req.body || !req.body.url) {
    return res.status(400).send('Invalid url in body of request');
  }
  const url = req.body.url;
  const result = await apiHelpers.sendUrlToGoogleVisionForOCR(url);
  return result === 'err' ? res.status(400).send('Error, Google OCR did not handle your request properly') : res.status(200).send(result);
});

router.get('/v1/oxford/sentence/word/*', async (req, res) => {
  const queryWord = req.params[0];
  const result = await apiHelpers.getSamplePhraseEnglishFromWordOxford(queryWord);
  return typeof result === 'string' ? res.status(400).send('Error, please follow request format') : res.status(200).send(result);
});

router.get('/v1/wordnik/sentence/word/*', async (req, res) => {
  const queryWord = req.params[0];
  const result = await apiHelpers.getSamplePhraseFromWordWordnik(queryWord);
  return typeof result === 'string' ? res.status(400).send('Error, please follow request format') : res.status(200).send(result);
});

router.post('/v1/googletranslate/sentence', async (req, res) => {
  if (!req.body || !req.body.q || !req.body.source || !req.body.target) {
    return res.status(400).send('Error, please follow request body format');
  }
  const q = req.body.q;
  const source = req.body.source;
  const target = req.body.target;
  const result = await apiHelpers.getGoogleTranslateOfSentence(q, source, target);
  return typeof result === 'string' ? res.status(400).send('Error, please follow request body format') : res.status(200).send(result);
});

router.post('/v1/googletranslate/wordmap', async (req, res) => {
  if (!req.body || !req.body.q || !req.body.source) {
    return res.status(400).send('Error in body of request');
  }
  const q = req.body.q;
  const source = req.body.source;
  const result = await apiHelpers.getGoogleTranslateOfWord(q, source);
  return typeof result === 'string' ? res.status(400).send(result) : res.status(200).send(result);
});

// testing only delete when done
router.get('/v1/users/all', async (req, res) => {
  const user = await User.findAll({});
  return res.status(200).send(user);
});

router.get('/v1/users/auth/*/*', async (req, res) => {
  const socialLoginSource = req.params[0];
  const username = decodeURI(req.params[1]);
  if (socialLoginSource === 'facebook') {
    const result = await dbHelpers.findUserIfExistsBySocialId(socialLoginSource, username);
    return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
  }
  return res.sendStatus(400);
});

router.post('/v1/users/findorcreate', async (req, res) => {
  const facebookUsername = decodeURI(req.body.facebookUsername);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const token = req.body.token;
  const nativeLang = req.body.nativeLang;
  const learnLang = req.body.learnLang;
  const email = req.body.email;
  const result = await dbHelpers.findAndUpdateOrCreateUser(
    facebookUsername,
    firstName,
    lastName,
    token,
    nativeLang,
    learnLang,
    email);
  return typeof result === 'string' ? res.status(400).send('Error finding or creating a user') : res.status(200).send(result);
});

router.get('/v1/decks/all', async (req, res) => {
  const result = await dbHelpers.getAllDecks(); // getting cards array, why? seeded data?
  return typeof result === 'string' ? res.status(400).send('Error querying for deck information') : res.status(200).send(result);
});

router.get('/v1/decks/deckid/*', async (req, res) => {  // good!
  const id = +req.params[0];
  const result = await dbHelpers.getDeckByDeckId(id);
  return typeof result === 'string' ? res.status(400).send('Error querying for a deck') : res.status(200).send(result);
});

router.get('/v1/decks/userid/*', async (req, res) => {  // good!
  const id = +req.params[0];
  const result = await dbHelpers.getDeckByUserId(id);
  return typeof result === 'string' ? res.status(400).send('Error looking for decks') : res.status(200).send(result);
});

router.get('/v1/cards/all', async (req, res) => {
  const result = await dbHelpers.getAllCards();  // good
  return typeof result === 'string' ? res.status(400).send('Error finding all cards') : res.status(200).send(result);
});

router.get('/v1/cards/deckid/*', async (req, res) => {  // need to test with proper data again
  const id = +req.params[0];
  const result = await dbHelpers.getAllCardsFromDeckByDeckId(id);
  return typeof result === 'string' ? res.status(400).send('Error getting cards for a deck') : res.status(200).send(result);
});

router.post('/v1/decks/new', async (req, res) => {  // good!
  if (!req.body || !req.body.name || !req.body.user_id || !req.body.stars) {
    return res.status(400).send('Error in body of request');
  }
  const name = req.body.name;
  const user_id = req.body.user_id;
  const stars = req.body.stars;
  const result = await dbHelpers.userCreateNewDeck(name, user_id, stars);
  return typeof result === 'string' ? res.status(400).send('Error creating a new deck') : res.status(200).send(result);
});

router.post('/v1/cards/addcard', async (req, res) => { // working! leave it def for now!!!
  if (!req.body || !req.body.user_id || !req.body.imgUrl || !req.body.wordMap || !req.body.deck_id) {
    return res.status(400).send('Error in body of request');
  }
  const user_id = req.body.user_id;
  const imgUrl = req.body.imgUrl;
  const wordMap = req.body.wordMap;
  const deck_id = req.body.deck_id;
  const result = await dbHelpers.userAddCreatedCardToDeck(user_id, imgUrl, wordMap, deck_id);
  return typeof result === 'string' ? res.status(400).send('Error adding a card') : res.status(200).send(result);
});

router.post('/v1/cards/paginganswer', async (req, res) => {  // issues
  if (!req.body || !req.body.card_id || !req.body.deck_id || !req.body.answer) {
    return res.status(400).send('Error in body of request');
  }
  const deck_id = req.body.deck_id;
  const card_id = req.body.card_id;
  const answer = req.body.answer;
  const result = await dbHelpers.userAnswerToCardWhilePaging(deck_id, card_id, answer);
  return typeof result === 'string' ? res.status(400).send('Error rating a card') : res.status(200).send(result);
});

router.post('/v1/decks/adddecks', async (req, res) => {
  if (!req.body || !req.body.id || !req.body.decks) {
    return res.status(400).send('Error in body of request');
  }
  const user_id = req.body.id;
  const decks = JSON.parse(req.body.decks);
  const result = await dbHelpers.addMultipleDecksAndUserSpecificsToJoinTable(user_id, decks);
  return typeof result === 'string' ? res.status(400).send('Error adding decks') : res.status(200).send('OK');
});

router.post('/v1/decks/addstar', async (req, res) => {
  if (!req.body || !req.body.deck_id) {
    return res.status(400).send('Error in body of request');
  }
  const deck_id = req.body.deck_id;
  const result = await dbHelpers.addStarToDeckByDeckId(deck_id);
  return typeof result === 'string' ? res.status(400).send('Error adding likes to deck') : res.status(200).send(result);
});

router.post('/v1/decks/addcards', async (req, res) => {
  if (!req.body || !req.body.deck_id || !req.body.cardIds) {
    return res.status(400).send('Error in body of request');
  }
  const deck_id = req.body.deck_id;
  const cardIdsArr = req.body.cardIds;
  const result = await dbHelpers.createCardsForDeckByCardIds(deck_id, cardIdsArr);
  return typeof result === 'string' ? res.status(400).send('Error adding cards to deck') : res.sendStatus(result);
});

router.delete('/v1/decks/userid/*/deckid/*/cardid/*', async (req, res) => {
  const user_id = req.params[0];
  const deck_id = req.params[1];
  const card_id = req.params[2];
  const result = await dbHelpers.userRemoveCardFromOwnDeckByDeckId(user_id, deck_id, card_id);
  return typeof result === 'string' ? res.status(400).send('Error deleting card') : res.sendStatus(result);
});

router.delete('/v1/decks/mult/*', async (req, res) => {
  const ids = req.params[0].split('/');
  const result = await dbHelpers.deleteMultipleDecksByIds(ids);
  return typeof result === 'string' ? res.status(400).send('Error deleting decks') : res.sendStatus(result);
});

router.delete('/v1/cards/*', async (req, res) => {
  const id = req.params[0];
  const result = await dbHelpers.deleteCardById(id);
  return result === 200 ? res.sendStatus(200) : res.sendStatus(400);
});

router.delete('/v1/decks/*', async (req, res) => {
  const id = +req.params[0];
  const result = await dbHelpers.deleteDeckById(id);
  return result === 200 ? res.sendStatus(200) : res.sendStatus(400);
});

module.exports = router;
