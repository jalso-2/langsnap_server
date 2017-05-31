const User = require('../user/user_schema');
const dbSeeders = require('./db_seeder_helpers');

(async () => {
  try {
    await User.bulkCreate([
      { facebookUsername: 'Jeralisha Ayania', firstName: 'Jay', lastName: 'Franklin', token: '213456', email: 'jayfrank@gmail.com', nativeLang: 'English', learnLang: 'Japanese' },
      { facebookUsername: 'JDGoedert', firstName: 'James', lastName: 'Goedert', token: '2112asd3456', email: 'james@gmail.com', nativeLang: 'English', learnLang: 'French' },
      { facebookUsername: 'zbbergma', firstName: 'Zachary', lastName: 'Bergmann', token: '21345jjjj6', email: 'zachary@gmail.com', nativeLang: 'English', learnLang: 'German' },
      { facebookUsername: 'shamsali1', firstName: 'Shams', lastName: 'Ali', token: '21333333456', email: 'shamsali@gmail.com', nativeLang: 'English', learnLang: 'Dutch' },
      { facebookUsername: 'Emanuellll1', firstName: 'Eman', lastName: 'Youel', token: '111111213456', email: 'emanuel@gmail.com', nativeLang: 'French', learnLang: 'Chinese' },
    ]);

    dbSeeders.userCreateNewDeck('ZachDeck', 3, 45);
    dbSeeders.userCreateNewDeck('ZachDeck2', 3, 5);
    dbSeeders.userCreateNewDeck('JamesDeck', 2, 111);
    dbSeeders.userCreateNewDeck('JamesDeck2', 2, 888);
    dbSeeders.userCreateNewDeck('JayDeck', 1, 450);
    dbSeeders.userCreateNewDeck('JayDeck2', 1, 765);
    dbSeeders.userCreateNewDeck('AliDeck2', 4, 0);
    dbSeeders.userCreateNewDeck('EmanDeck1', 5, 89);
    dbSeeders.userCreateNewDeck('EmanDeck2', 5, 312);

    dbSeeders.userAddCreatedCardToDeck(1, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"en":"not!"}', 1);
    dbSeeders.userAddCreatedCardToDeck(1, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"es":"si!"}', 1);
    dbSeeders.userAddCreatedCardToDeck(1, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"ru":"ple!"}', 2);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"en":"gdsaf!"}', 3);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"es":"n!"}', 3);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"fr":"non!"}', 4);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"en":"yay!"}', 4);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"ca":"leaf!"}', 4);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"yn":"beef!"}', 5);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"cn":"adsf!"}', 5);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"ra":"ka!"}', 6);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"po":"sausage!"}', 6);
    dbSeeders.userAddCreatedCardToDeck(4, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"fa":"la!"}', 7);
    dbSeeders.userAddCreatedCardToDeck(4, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"qa":"nossst!"}', 7);
    dbSeeders.userAddCreatedCardToDeck(4, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"bn":"ccct!"}', 7);
    dbSeeders.userAddCreatedCardToDeck(5, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"ll":"nolllllt!"}', 8);
    dbSeeders.userAddCreatedCardToDeck(5, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"ff":"fff!"}', 8);
    dbSeeders.userAddCreatedCardToDeck(5, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"zz":"zzz!"}', 9);
    dbSeeders.userAddCreatedCardToDeck(5, 'https://art-s.nflximg.net/fe3ed/9568ac3ce5eed5e4fc7d91e8ac2a5114d12fe3ed.jpg', '{"jj":"jjj!"}', 9);
  } catch (err) {
    console.log('Error while seeding DB, make sure the check PSQL');
  }
})();
