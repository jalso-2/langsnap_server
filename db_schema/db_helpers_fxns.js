const bluebird = require('bluebird');
const User = require('./user/user_schema');
const Card = require('./card/card_schema');
const Deck = require('./deck/deck_schema');
const DeckCard = require('./deck_card/deck_card_schema');
const UserCard = require('./user_card/user_card_schema');

module.exports = {

  userGetItAll: async () => {
    try {
      const everything = await Deck.findAll({
        where: {},
        include: [
          {
            model: User,
          },
          {
            model: Card,
            through: {},
          },
        ],
      });
      return everything;
    } catch (err) {
      return 'err';
    }
  },

  getAllCardsFromDeckByDeckId: async (id) => {
    try {
      const deck = await Deck.findAll({
        include: [{
          model: Card,
          attributes: ['id', 'imgUrl', 'wordMap', 'stars'],
          through: { model: DeckCard, attributes: ['lastVisited', 'timeInterval', 'phrase'] },
        }],
        where: { id },
        attributes: ['id', 'name'],
      });
      deck[0].cards.sort((first, second) => {
        const firstCopy = new Date(first.deck_card.lastVisited.getTime() + first.deck_card.timeInterval);
        const secondCopy = new Date(second.deck_card.lastVisited.getTime() + second.deck_card.timeInterval);
        return firstCopy > secondCopy;
      });
      return deck;
    } catch (err) {
      return 'err';
    }
  },

  findUserIfExistsBySocialId: async (socialLoginSource, username) => {
    try {
      const user = await User.findOne({ where: { facebookUsername: username } });
      return user;
    } catch (err) {
      return 'err';
    }
  },

  findAndUpdateOrCreateUser: async (facebookUsername, firstName, lastName, token, nativeLang, learnLang, email) => {
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
      user = await User.findOne({ where: { facebookUsername } });
      return user;
    } catch (err) {
      return 'err';
    }
  },

  getAllDecks: async () => {
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
      return decks;
    } catch (err) {
      return 'err';
    }
  },

  getDeckByDeckId: async (id) => {
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
        return {};
      }
      return decks[0];
    } catch (err) {
      return 'err';
    }
  },

  getDeckByUserId: async (id) => {
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
      return decks;
    } catch (err) {
      return 'err';
    }
  },

  userAnswerToCardWhilePaging: async (deck_id, card_id, answer) => {
    const userMultFactor = {
      good: 2,
      ok: 1,
      bad: 0.5,
    };
    const timeIntervalMultiplier = userMultFactor[answer];
    try {
      console.log('going!');
      const currentDeckCard = await DeckCard.findOne({ where: { deck_id, card_id } });
      console.log('and going!!!');
      await DeckCard.update({
        timeInterval: currentDeckCard.timeInterval * timeIntervalMultiplier,
        lastVisited: (new Date()).toISOString(),
      }, { where: { deck_id, card_id } });
      console.log('annnnnddddd gone!!!!');
      return {};
    } catch (err) {
      return 'err';
    }
  },

  addStarToDeckByDeckId: async (deck_id) => {
    try {
      const deck = await Deck.findOne({ where: { id: deck_id } });
      Deck.update({ stars: deck.stars + 1 }, { where: { id: deck_id } });
      deck.stars = deck.stars + 1;
      return deck;
    } catch (err) {
      return 'err';
    }
  },

  getAllCards: async () => {
    try {
      const cards = await Card.findAll({
        include: [{
          model: Deck,
          attributes: [],
          through: {
            model: DeckCard,
            attributes: ['wordMap'],
          },
        }],
        where: {},
      });
      return cards;
    } catch (err) {
      return 'err';
    }
  },

  userCreateNewDeck: async (name, user_id, stars) => {
    try {
      const deck = await Deck.create({ name, user_id, stars });
      return deck;
    } catch (err) {
      return 'err';
    }
  },

  userAddCreatedCardToDeck: async (user_id, imgUrl, wordMap, deck_id) => {  // need to fix
    try {
      const card = await Card.create({ stars: 0, wordMap, imgUrl });
      await card.addUser(user_id);
      const deck = await Deck.findOne({ where: { id: deck_id } });
      await card.addDeck(deck, {
        timeInterval: 900000,
        phrase: '',
        lastVisited: (new Date()).toISOString(),
        card_id: card.id,
        deck_id: deck.id,
      });
      return card;
    } catch (err) {
      return 'err';
    }
  },

  deleteCardById: async (id) => {
    try {
      const numDeletedCards = await Card.destroy({
        where: { id },
      });
      if (numDeletedCards) {
        return 200;
      }
      return 400;
    } catch (err) {
      return 400;
    }
  },

  deleteDeckById: async (id) => {
    try {
      const numDeletedDecks = await Deck.destroy({
        where: { id },
      });
      if (numDeletedDecks) {
        return 200;
      }
      return 400;
    } catch (err) {
      return 400;
    }
  },

  addMultipleDecksAndUserSpecificsToJoinTable: async (user_id, decks) => {
    console.log(user_id, 'this your userid');
    try {
      await Promise.all(decks.map(async (deckId) => {
        const origDeck = await Deck.findOne({ where: { id: deckId } });
        const name = origDeck.name;
        const createdDeck = await Deck.create({ user_id, name, stars: 0 });
        const joinTableCardIdsArr = await DeckCard.findAll({
          where: { deck_id: deckId },
        });
        await Promise.all(joinTableCardIdsArr.map(async (joinObj) => {
          const card = await Card.findOne({ where: { id: joinObj.card_id } });
          await card.addUser(user_id);
          await createdDeck.addCard(card, {
            timeInterval: 900000,
            phrase: joinObj.phrase,
            lastVisited: (new Date()).toISOString(),
            card_id: joinObj.card_id,
            deck_id: joinObj.deck_id,
          });
        }));
      }));
      return 200;
    } catch (err) {
      return 'err';
    }
  },

  createCardsForDeckByCardIds: async (deck_id, cardIdsArr) => {
    try {
      const deck = await Deck.findOne({ where: { id: deck_id } });
      await Promise.all(cardIdsArr.map(async (card_id) => {
        const card = await Card.findOne({ where: { id: card_id } });
        const joinTableEntry = await DeckCard.findOne({
          where: {
            card_id,
          },
        });
        await deck.addCard(card, {
          timeInterval: 900000,
          phrase: joinTableEntry.phrase,
          lastVisited: (new Date()).toISOString(),
          card_id,
        });
        await card.addUser(deck.user_id);
        return 200;
      }));
      return 200;
    } catch (err) {
      return 'err';
    }
  },

  deleteMultipleDecksByIds: async (ids) => {
    try {
      const deck = await Deck.findOne({ where: { id: +ids[0] } });
      const user_id = deck.user_id;
      let cardsToRemoveFromUser = [];
      await Promise.all(ids.map(async (deck_id) => {
        const joinEntries = await DeckCard.findAll({ where: { deck_id: +deck_id } });
        cardsToRemoveFromUser = cardsToRemoveFromUser.concat(joinEntries.map(entry => entry.card_id));
        await DeckCard.destroy({ where: { deck_id: +deck_id } });
        await Deck.destroy({ where: { id: deck_id } });
      }));
      await Promise.all(cardsToRemoveFromUser.map(async (card_id) => {
        await UserCard.destroy({ where: { user_id, card_id } });
      }));
      return 200;
    } catch (err) {
      return 'err';
    }
  },

  userRemoveCardFromOwnDeckByDeckId: async (user_id, deck_id, card_id) => {
    try {
      await DeckCard.destroy({ where: { deck_id, card_id } });
      await UserCard.destroy({ where: { user_id, card_id } });
      return 200;
    } catch (err) {
      return 'err';
    }
  },
};
