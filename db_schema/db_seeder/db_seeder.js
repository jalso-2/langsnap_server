const User = require('../user/user_schema');
const Card = require('../card/card_schema');
const Deck = require('../deck/deck_schema');
require('./db_seeder_helpers');

setTimeout(async () => {
  await User.bulkCreate([
    { facebookUsername: 'Jeralisha Ayania', firstName: 'Jay', lastName: 'Franklin', token: '213456', email: 'jayfrank@gmail.com', nativeLang: 'English', learnLang: 'Japanese' },
    { facebookUsername: 'JDGoedert', firstName: 'James', lastName: 'Goedert', token: '2112asd3456', email: 'james@gmail.com', nativeLang: 'English', learnLang: 'French' },
    { facebookUsername: 'zbbergma', firstName: 'Zachary', lastName: 'Bergmann', token: '21345jjjj6', email: 'zachary@gmail.com', nativeLang: 'English', learnLang: 'German' },
    { facebookUsername: 'shamsali1', firstName: 'Shams', lastName: 'Ali', token: '21333333456', email: 'shamsali@gmail.com', nativeLang: 'English', learnLang: 'Dutch' },
    { facebookUsername: 'Emanuellll1', firstName: 'Eman', lastName: 'Youel', token: '111111213456', email: 'emanuel@gmail.com', nativeLang: 'French', learnLang: 'Chinese' },
  ]);

  await Card.bulkCreate([
    { imgUrl: 'http://as', stars: 45, wordMap: '{"nope": []}' },
    { imgUrl: 'http://as345dfads', stars: 1, wordMap: '{"nope2": []}' },
    { imgUrl: 'http://asdfa111ds', stars: 56, wordMap: '{"nope3": []}' },
    { imgUrl: 'http://asdfads555', stars: 99, wordMap: '{"nope4": []}' },
    { imgUrl: 'http://asdfads888', stars: 33, wordMap: '{"nope5": []}' },
    { imgUrl: 'http://asdfads0000', stars: 456, wordMap: '{"nope6": []}' },
  ]);

  await Deck.bulkCreate([
    { name: 'JDeck', user_id: 1, stars: 2 },
    { name: 'JJJJDeck', user_id: 1, stars: 12 },
    { name: 'JamesDeck', user_id: 2, stars: 4 },
    { name: 'James2Deck', user_id: 2, stars: 8 },
    { name: 'James3Deck', user_id: 2, stars: 7 },
    { name: 'ZZZDeck', user_id: 3, stars: 1 },
    { name: 'Ali1Deck', user_id: 4, stars: 0 },
    { name: 'Ali2Deck', user_id: 4, stars: 3 },
    { name: 'EmanDeck', user_id: 5, stars: 15 },
  ]);


  // User_Cards.bulkCreate([
  //   { user_id: 1, card_id: 1 },
  //   { user_id: 1, card_id: 5 },
  //   { user_id: 1, card_id: 6 },
  //   { user_id: 1, card_id: 3 },
  //   { user_id: 2, card_id: 1 },
  //   { user_id: 2, card_id: 2 },
  //   { user_id: 2, card_id: 4 },
  //   { user_id: 2, card_id: 5 },
  //   { user_id: 2, card_id: 6 },
  // ]);

  // Deck_Cards.bulkCreate([
  //   { deck_id: 1, card_id: 3, timeInterval: 3030, phrase: 'cerveza', lastVisited: '2016-04-29T19:19:55Z' },
  //   { deck_id: 1, card_id: 5, timeInterval: 3000, phrase: 'blueberry pie', lastVisited: '2017-05-29T19:19:55Z' },
  //   { deck_id: 1, card_id: 6, timeInterval: 3, phrase: 'choco tacos', lastVisited: '2004-04-23T19:19:55Z' },
  //   { deck_id: 2, card_id: 3, timeInterval: 6000, phrase: 'enchiladas', lastVisited: '2000-01-29T19:19:55Z' },
  //   { deck_id: 2, card_id: 6, timeInterval: 8000, phrase: 'burritos', lastVisited: '2018-09-07T19:19:55Z' },
  //   { deck_id: 3, card_id: 1, timeInterval: 555, phrase: 'banana', lastVisited: '2016-05-29T19:19:55Z' },
  //   { deck_id: 3, card_id: 2, timeInterval: 666, phrase: 'apple', lastVisited: '2011-05-29T19:19:55Z' },
  //   { deck_id: 3, card_id: 4, timeInterval: 1, phrase: 'zzzz', lastVisited: '2012-05-29T19:19:55Z' },
  //   { deck_id: 4, card_id: 1, timeInterval: 89, phrase: 'yyyy', lastVisited: '2013-05-29T19:19:55Z' },
  //   { deck_id: 4, card_id: 4, timeInterval: 52, phrase: 'nada yada', lastVisited: '2017-08-26T19:19:55Z' },
  //   { deck_id: 5, card_id: 5, timeInterval: 365, phrase: 'muffins', lastVisited: '2017-05-22T19:19:55Z' },
  //   { deck_id: 5, card_id: 2, timeInterval: 1080, phrase: 'nada', lastVisited: '2019-03-22T19:19:55Z' },
  //   { deck_id: 5, card_id: 6, timeInterval: 2440, phrase: 'nadasdafsdf yada', lastVisited: '2010-04-01T19:19:55Z' },
  // ]);
}, 3000);
