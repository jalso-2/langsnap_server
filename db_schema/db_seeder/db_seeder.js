const User = require('../user/user_schema');
const dbSeeders = require('./db_seeder_helpers');

(async () => {
  try {
    await User.bulkCreate([
      { facebookUsername: 'Jay Ayania', firstName: 'Jay', lastName: 'Franklin', token: '213456', email: 'jayfrank@gmail.com', nativeLang: 'English', learnLang: 'Japanese' },
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

    dbSeeders.userAddCreatedCardToDeck(1, 'http://cdn.akc.org/corgi-3.jpg', '{"en":"dog","es":"perro","fr":"chien","de":"Hund","ja":"犬","ru":"собака"}', 1);
    dbSeeders.userAddCreatedCardToDeck(1, 'https://usercontent2.hubstatic.com/13207067_f520.jpg', '{"en":"cat","es":"gato","fr":"chat","de":"Katze","ja":"ネコ","ru":"Кот"}', 1);
    dbSeeders.userAddCreatedCardToDeck(1, 'https://target.scene7.com/is/image/Target/14767619?wid=520&hei=520&fmt=pjpeg', '{"en":"bottle","es":"botella","fr":"bouteille","de":"Flasche","ja":"ボトル","ru":"бутылка"}', 2);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://ak1.ostkcdn.com/images/products/10736645/P17792928.jpg', '{"en":"chair","es":"silla","fr":"chaise","de":"Sessel","ja":"椅子","ru":"стул"}', 3);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://gifts.worldwildlife.org/gift-center/Images/large-species-photo/large-Gorilla-photo.jpg', '{"en":"gorilla","es":"gorila","fr":"gorille","de":"Gorilla","ja":"ゴリラ","ru":"горилла"}', 3);
    dbSeeders.userAddCreatedCardToDeck(2, 'http://static2.jetpens.com/images/a/000/052/52677.jpg?s=2fdc7aac693dfa8a6144a79ee0dfa45e', '{"en":"pencil","es":"lápiz","fr":"crayon","de":"Bleistift","ja":"鉛筆","ru":"карандаш"}', 4);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/275px-A_small_cup_of_coffee.JPG', '{"en":"coffee","es":"café","fr":"café","de":"Kaffee","ja":"コーヒー","ru":"кофе"}', 4);
    dbSeeders.userAddCreatedCardToDeck(2, 'https://vignette2.wikia.nocookie.net/sniperelitegame/images/5/52/Dynamite_Bundle.jpg/revision/latest?cb=20151229195644', '{"en":"dynamite","es":"dinamita","fr":"dynamiter","de":"Dynamit","ja":"ダイナマイト","ru":"динамит"}', 4);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://media.gcflearnfree.org/content/55e0730c7dd48174331f5164_01_17_2014/laptop_full_view.jpg', '{"en":"computer","es":"computadora","fr":"ordinateur","de":"Computer","ja":"コンピューター","ru":"компьютер"}', 5);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://marketplace.canva.com/MACHhbIoccw/1/0/thumbnail_large/canva-teal-hockey-player-illustration-victory-poster-MACHhbIoccw.jpg', '{"en":"poster","es":"póster","fr":"affiche","de":"Poster","ja":"ポスター","ru":"плакат"}', 5);
    dbSeeders.userAddCreatedCardToDeck(3, 'http://cdnmedia.endeavorsuite.com/images/OrganIzations/1532e286-9d1c-493d-9f5d-7acadf4534bb/rentals/104648.gif', '{"en":"ladder","es":"escalera","fr":"échelle","de":"Leiter","ja":"ラダー","ru":"лестница"}', 6);
    dbSeeders.userAddCreatedCardToDeck(3, 'https://www.nature.org/cs/groups/webcontent/@web/@forests/documents/media/forests-of-north-america.jpg', '{"en":"forest","es":"bosque","fr":"forêt","de":"Wald","ja":"森林","ru":"лес"}', 6);
    dbSeeders.userAddCreatedCardToDeck(4, 'https://ichef.bbci.co.uk/images/ic/480x270/p01lckx1.jpg', '{"en":"world","es":"mundo","fr":"monde","de":"Welt","ja":"世界","ru":"Мир"}', 7);
    dbSeeders.userAddCreatedCardToDeck(4, 'http://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=169822_wood_C&layer=comp&$prodzoom0$', '{"en":"desk","es":"escritorio","fr":"bureau","de":"Schreibtisch","ja":"机","ru":"стол письменный"}', 7);
    dbSeeders.userAddCreatedCardToDeck(4, 'http://fullmoonbrewwork.com/wp-content/uploads/2014/06/FMBW_Beers_Phuket-Lager-300x300.png', '{"en":"beer","es":"cerveza","fr":"Bière","de":"Bier","ja":"ビール","ru":"пиво"}', 7);
    dbSeeders.userAddCreatedCardToDeck(5, 'http://www.homedepot.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Bath/Toilet_Seats_and_Bidets/shop-by-rough-size-1.jpg', '{"en":"toilet","es":"baño","fr":"toilette","de":"Toilette","ja":"トイレ","ru":"туалет"}', 8);
    dbSeeders.userAddCreatedCardToDeck(5, 'https://s-media-cache-ak0.pinimg.com/originals/37/6d/44/376d442176f0af9dd2112cf8e5ea4937.jpg', '{"en":"storm","es":"tormenta","fr":"orage","de":"Sturm","ja":"嵐","ru":"буря"}', 8);
    dbSeeders.userAddCreatedCardToDeck(5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/2667_Spotted_Hyena_Cubs.JPG/200px-2667_Spotted_Hyena_Cubs.JPG', '{"en":"hyena","es":"hiena","fr":"hyène","de":"Hyäne","ja":"ハイエナ","ru":"гиена"}', 9);
    dbSeeders.userAddCreatedCardToDeck(5, 'http://www.coatesville.org/website/wp-content/uploads/2010/12/trash-can.jpg', '{"en":"trash","es":"basura","fr":"poubelle","de":"Müll","ja":"ごみ","ru":"мусор"}', 9);
  } catch (err) {
    console.log('Error while seeding DB, make sure the check PSQL');
  }
})();
