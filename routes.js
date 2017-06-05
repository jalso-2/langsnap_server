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

router.post('/v1/cloudinaryurltogoogle', (req, res) => {
  if (!req.body || !req.body.url) {
    return res.status(400).send('Invalid url in body of request');
  }
  const url = req.body.url;
  console.log(url);
  return apiHelpers.sendUrlToGoogleVisionForName(url, res);
});

router.get('/v1/oxford/sentence/word/*', (req, res) => {
  const queryWord = req.params[0];
  return apiHelpers.getSamplePhraseEnglishFromWordOxford(queryWord, res);
});

router.get('/v1/wordnik/sentence/word/*', (req, res) => {
  const queryWord = req.params[0];
  return apiHelpers.getSamplePhraseFromWordWordnik(queryWord, res);
});

router.post('/v1/googletranslate/sentence', (req, res) => {
  if (!req.body || !req.body.q || !req.body.source || !req.body.target) {
    return res.status(400).send('Error in body of request');
  }
  const q = req.body.q;
  const source = req.body.source;
  const target = req.body.target;
  return apiHelpers.getGoogleTranslateOfSentence(q, source, target, res);
});

router.post('/v1/googletranslate/wordmap', (req, res) => {
  if (!req.body || !req.body.q || !req.body.source) {
    return res.status(400).send('Error in body of request');
  }
  const q = req.body.q;
  const source = req.body.source;
  return apiHelpers.getGoogleTranslateOfWord(q, source, res);
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
  const result = dbHelpers.findAndUpdateOrCreateUser(
    facebookUsername,
    firstName,
    lastName,
    token,
    nativeLang,
    learnLang,
    email,
    res);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.get('/v1/decks/all', async (req, res) => {
  const result = await dbHelpers.getAllDecks(); // getting cards array, why? seeded data?
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.get('/v1/decks/deckid/*', async (req, res) => {  // good!
  const id = +req.params[0];
  const result = await dbHelpers.getDeckByDeckId(id);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.get('/v1/decks/userid/*', async (req, res) => {  // good!
  const id = +req.params[0];
  const result = await dbHelpers.getDeckByUserId(id);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.get('/v1/cards/all', async (req, res) => {
  const result = await dbHelpers.getAllCards();  // good
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.get('/v1/cards/deckid/*', async (req, res) => {  // need to test with proper data again
  const id = +req.params[0];
  const result = await dbHelpers.getAllCardsFromDeckByDeckId(id);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.post('/v1/decks/new', async (req, res) => {  // good!
  if (!req.body || !req.body.name || !req.body.user_id || !req.body.stars) {
    return res.status(400).send('Error in body of request');
  }
  const name = req.body.name;
  const user_id = req.body.user_id;
  const stars = req.body.stars;
  const result = await dbHelpers.userCreateNewDeck(name, user_id, stars);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
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
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.post('/v1/cards/answer', async (req, res) => {
  if (!req.body || !req.body.card_id || !req.body.deck_id || !req.body.answer) {
    return res.status(400).send('Error in body of request');
  }
  const deck_id = req.body.deck_id;
  const card_id = req.body.card_id;
  const answer = req.body.answer;
  const result = await dbHelpers.userAnswerToCardWhilePaging(deck_id, card_id, answer);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.post('/v1/decks/adddecks', async (req, res) => {  // I think this one works!
  if (!req.body || !req.body.user_id || !req.body.decks) {
    return res.status(400).send('Error in body of request');
  }
  const user_id = req.body.id;
  const decks = JSON.parse(req.body.decks);
  const result = await dbHelpers.addMultipleDecksAndUserSpecificsToJoinTable(user_id, decks);
  return result instanceof Error ? res.status(400).send(result) : res.sendStatus(result);
});

router.post('/v1/decks/addstar', async (req, res) => {
  if (!req.body || !req.body.deck_id) {
    return res.status(400).send('Error in body of request');
  }
  const deck_id = req.body.deck_id;
  const result = await dbHelpers.addStarToDeckByDeckId(deck_id);
  return result instanceof Error ? res.status(400).send(result) : res.status(200).send(result);
});

router.post('/v1/decks/addcards', async (req, res) => {  // need to test a bit more!
  if (!req.body || !req.body.deck_id || !req.body.cardIds) {
    return res.status(400).send('Error in body of request');
  }
  const deck_id = req.body.deck_id;
  const cardIdsArr = req.body.cardIds;
  const result = await dbHelpers.createCardsForDeckByCardIds(deck_id, cardIdsArr);
  return result instanceof Error ? res.status(400).send(result) : res.sendStatus(result);
});

router.delete('/v1/decks/userid/*/deckid/*/cardid/*', async (req, res) => {
  const user_id = req.params[0];
  const deck_id = req.params[1];
  const card_id = req.params[2];
  const result = await dbHelpers.userRemoveCardFromOwnDeckByDeckId(user_id, deck_id, card_id);
  return result instanceof Error ? res.status(400).send(result) : res.sendStatus(result);
});

router.delete('/v1/decks/mult/*', async (req, res) => {  // needs to delete from user_cards also...
  const ids = req.params[0].split('/');
  const result = await dbHelpers.deleteMultipleDecksByIds(ids);
  return result instanceof Error ? res.status(400).send(result) : res.sendStatus(result);
});

router.delete('/v1/cards/*', async (req, res) => {  // good, deletes from deck_cards join correctly
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
