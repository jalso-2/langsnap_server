const Card = require('../card/card_schema');
const Deck = require('../deck/deck_schema');

module.exports = {
  userCreateNewDeck: async (name, user_id, stars) => {
    try {
      const deck = await Deck.create({ name, user_id, stars });
      console.log(`Added 1 deck successfully!: deck_id: ${deck.id}, user_id:${user_id}`);
    } catch (err) {
      console.log(err, 'Error adding deck to database!');
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
      return console.log(`Successfully added user_id:${user_id}
      the card:${card.id} in deck:${deck_id}`);
    } catch (err) {
      return console.log(err, 'Error adding cards to deck!');
    }
  },
};
