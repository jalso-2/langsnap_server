const bluebird = require('bluebird');
const axios = require('axios');
const User = require('./user/user_schema');
const Card = require('./card/card_schema');
const Deck = require('./deck/deck_schema');
const DeckCard = require('./deck_card/deck_card_schema');
const UserCard = require('./user_card/user_card_schema');

module.exports = {
  sendUrlToGoogleVisionForName: (url, res) => {
    axios({
      method: 'post',
      url: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_KEY}`,
      data: {
        requests: [
          {
            image: {
              source: {
                imageUri:
                  url,
              },
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 5,
              },
            ],
          },
        ],
      },
    })
    .then(resp =>
      res.status(200).send(resp.data.responses[0].labelAnnotations[0].description))
    .catch(err =>
      res.status(400).send(err));
  },
  getGoogleTranslateOfSentence: (q, source, target, res) => {
    axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_VISION}`,
      {
        q,
        source,
        target,
        format: 'text',
      })
        .then(transData => res.status(200).send(transData.data))
        .catch(err => res.status(400).send(err));
  },
  getSamplePhraseFromWordWordnik: (queryWord, res) => {
    axios.get(`http://api.wordnik.com:80/v4/word.json/${queryWord}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${process.env.WORDNIK_KEY}`)
      .then(response => res.status(200).send(response.data))
      .catch(err => res.status(400).send(err));
  },
  getSamplePhraseEnglishFromWordOxford: (queryWord, res) => {
    axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${queryWord}/sentences`, {
      headers: {
        Accept: 'application/json',
        app_id: process.env.OXFORD_APP_ID,
        app_key: process.env.OXFORD_APP_KEY,
      },
    })
      .then(response => res.status(200).send(response.data))
      .catch(err => res.status(400).send(err));
  },
  getAllCardsFromDeckByDeckId: async (id, res) => {
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
  },
  findUserIfExistsBySocialId: async (socialLoginSource, username, res) => {
    try {
      const user = await User.findOne({ where: { facebookUsername: username } });
      if (user === null) {
        return res.status(200).send({});
      }
      return res.status(200).send(user);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  findAndUpdateOrCreateUser: async (
    facebookUsername,
    firstName,
    lastName,
    token,
    nativeLang,
    learnLang,
    email,
    res) => {
    try {
      let user = await User.findOrCreate({
        where: { facebookUsername },
        defaults: {
          facebookUsername,
          firstName,
          lastName,
          token,
          nativeLang,
          learnLang,
          email,
        },
      });
      if (!user[1]) {
        try {
          user = await User.update({
            firstName,
            lastName,
            token,
            nativeLang,
            learnLang,
            email,
          }, {
            where: { facebookUsername },
          });
          try {
            user = await User.findOne({ where: { facebookUsername } });
            return res.status(200).send(user);
          } catch (erro) {
            return res.status(400).send(erro);
          }
        } catch (error) {
          return res.status(400).send(error);
        }
      } else {
        return res.status(200).send(user[0]);
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getAllDecks: async (res) => {
    try {
      const decks = await Deck.findAll({
        include: [
          {
            model: Card,
            attributes: ['imgUrl'],
            through: { attributes: [] },
          },
        ],
        attributes: ['id', 'name', 'stars'],
      });
      return res.status(200).send(decks);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getDeckByDeckId: async (id, res) => {
    try {
      const decks = await Deck.findAll({
        include: [
          {
            model: Card,
            attributes: ['id', 'imgUrl', 'wordMap', 'stars'],
            through: { attributes: [] },
          },
        ],
        where: { id },
        attributes: ['id', 'name', 'stars'],
      });
      if (!decks.length) {
        return res.status(400).send('Failed to find Deck in Database');
      }
      return res.status(200).send(decks[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getDeckByUserId: async (id, res) => {
    try {
      const decks = await Deck.findAll({
        include: [
          {
            model: Card,
            attributes: ['imgUrl'],
            through: { attributes: [] },
          },
          {
            model: User,
            attributes: [],
          },
        ],
        where: { user_id: id },
        attributes: ['id', 'name', 'stars'],
      });
      return res.status(200).send(decks);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getAllCards: async (res) => {
    try {
      const cards = await Card.findAll({ attributes: ['id', 'imgUrl', 'stars'] });
      return res.status(200).send(cards);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  userCreateNewDeck: async (name, user_id, stars, res) => {
    try {
      const deck = await Deck.create({ name, user_id, stars });
      return res.status(200).send(deck);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  userAddCreatedCardToDeck: async (user_id, imgUrl, wordMap, deck_id, res) => {
    try {
      const card = await Card.create({ stars: 0, wordMap, imgUrl });
      try {
        await card.addUser(user_id);
        try {
          await card.addDeck(deck_id);
          return res.status(200).send(card);
        } catch (error) {
          return res.status(500).send(error);
        }
      } catch (erro) {
        return res.status(500).send(erro);
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  deleteCardById: async (id, res) => {
    try {
      const numDeletedCards = await Card.destroy({
        where: { id },
      });
      if (numDeletedCards) {
        return res.sendStatus(200);
      }
      return res.sendStatus(400);
    } catch (err) {
      return res.sendStatus(400);
    }
  },
  deleteDeckById: async (id, res) => {
    try {
      const numDeletedDecks = await Deck.destroy({
        where: { id },
      });
      if (numDeletedDecks) {
        return res.sendStatus(200);
      }
      return res.sendStatus(400);
    } catch (err) {
      return res.sendStatus(400);
    }
  },
  createCardsForDeckByCardIds: async (deck_id, cardIdsArr, res) => {
    await Promise.all(cardIdsArr.map(async (card_id) => {
      try {
        const deck = await Deck.findOne({ where: { id: deck_id } });
        try {
          await deck.addDeck(deck_id);
          try {
            await deck.addCard(card_id);
            return 'OK';
          } catch (error) {
            return res.status(400).send(error);
          }
        } catch (erro) {
          return res.status(400).send(erro);
        }
      } catch (err) {
        return res.status(400).send(err);
      }
    }));
  },
};
