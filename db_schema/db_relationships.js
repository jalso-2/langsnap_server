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
