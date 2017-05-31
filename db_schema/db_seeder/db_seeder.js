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

    dbSeeders.userAddCreatedCardToDeck(1, 'http://dogimg.com', '{"en":"not!"}', 1);
    dbSeeders.userAddCreatedCardToDeck(1, 'http://catimg.com', '{"es":"si!"}', 1);
    dbSeeders.userAddCreatedCardToDeck(1, 'http://llamaimg.com', '{"ru":"ple!"}', 2);
    dbSeeders.userAddCreatedCardToDeck(2, 'http://goatimg.com', '{"en":"gdsaf!"}', 3);
    dbSeeders.userAddCreatedCardToDeck(2, 'http://lambimg.com', '{"es":"n!"}', 3);
    dbSeeders.userAddCreatedCardToDeck(2, 'http://sheepimg.com', '{"fr":"non!"}', 4);
    dbSeeders.userAddCreatedCardToDeck(2, 'http://lachupacagraimg.com', '{"en":"yay!"}', 4);
    dbSeeders.userAddCreatedCardToDeck(2, 'http://yaimg.com', '{"ca":"leaf!"}', 4);
    dbSeeders.userAddCreatedCardToDeck(3, 'http://bogimg.com', '{"yn":"beef!"}', 5);
    dbSeeders.userAddCreatedCardToDeck(3, 'http://froggimg.com', '{"cn":"adsf!"}', 5);
    dbSeeders.userAddCreatedCardToDeck(3, 'http://trolleyimg.com', '{"ra":"ka!"}', 6);
    dbSeeders.userAddCreatedCardToDeck(3, 'http://nolaimg.com', '{"po":"sausage!"}', 6);
    dbSeeders.userAddCreatedCardToDeck(4, 'http://sanfranimg.com', '{"fa":"la!"}', 7);
    dbSeeders.userAddCreatedCardToDeck(4, 'http://ghostimg.com', '{"qa":"nossst!"}', 7);
    dbSeeders.userAddCreatedCardToDeck(4, 'http://vampireimg.com', '{"bn":"ccct!"}', 7);
    dbSeeders.userAddCreatedCardToDeck(5, 'http://wolverineimg.com', '{"ll":"nolllllt!"}', 8);
    dbSeeders.userAddCreatedCardToDeck(5, 'http://werewolfimg.com', '{"ff":"fff!"}', 8);
    dbSeeders.userAddCreatedCardToDeck(5, 'http://yetiimg.com', '{"zz":"zzz!"}', 9);
    dbSeeders.userAddCreatedCardToDeck(5, 'http://gooseimg.com', '{"jj":"jjj!"}', 9);
  } catch (err) {
    console.log('Error while seeding DB, make sure the check PSQL');
  }
})();
