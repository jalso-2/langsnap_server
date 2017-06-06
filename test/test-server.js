const server = require('../server').server;
const dbSeeder = require('../db_schema/db_seeder/db_seeder_helpers');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);
describe('Langsnap API server', () => {
  const fakeUserData = [
      { facebookUsername: 'Jay Ayania', firstName: 'Jay', lastName: 'Franklin', token: '213456', email: 'jayfrank@gmail.com', nativeLang: 'English', learnLang: 'Japanese' },
      { facebookUsername: 'JDGoedert', firstName: 'James', lastName: 'Goedert', token: '2112asd3456', email: 'james@gmail.com', nativeLang: 'English', learnLang: 'French' },
      { facebookUsername: 'zbbergma', firstName: 'Zachary', lastName: 'Bergmann', token: '21345jjjj6', email: 'zachary@gmail.com', nativeLang: 'English', learnLang: 'German' }];
  const fakeDeckData = [
    { id: 1, name: 'ZachDeck2', user_id: 3, stars: 5 },
    { id: 2, name: 'JamesDeck', user_id: 2, stars: 888 },
    { id: 3, name: 'JayDeck', user_id: 1, stars: 450 },
    { id: 4, name: 'JayDeck2', user_id: 1, stars: 765 },
  ];
  const fakeCardData = [
    { id: 1, stars: 5, imgUrl: 'http://cdn.akc.org/corgi-3.jpg', wordMap: '{"en":"dog","es":"perro","fr":"chien","de":"Hund","ja":"犬","ru":"собака"}' },
    { id: 2, stars: 10, imgUrl: 'https://usercontent2.hubstatic.com/13207067_f520.jpg', wordMap: '{"en":"cat","es":"gato","fr":"chat","de":"Katze","ja":"ネコ","ru":"Кот"}' },
    { id: 3, stars: 15, imgUrl: 'https://target.scene7.com/is/image/Target/14767619?wid=520&hei=520&fmt=pjpeg', wordMap: '{"en":"bottle","es":"botella","fr":"bouteille","de":"Flasche","ja":"ボトル","ru":"бутылка"}' },
    { id: 4, stars: 20, imgUrl: 'https://ak1.ostkcdn.com/images/products/10736645/P17792928.jpg', wordMap: '{"en":"chair","es":"silla","fr":"chaise","de":"Sessel","ja":"椅子","ru":"стул"}' },
    { id: 5, stars: 25, imgUrl: 'https://gifts.worldwildlife.org/gift-center/Images/large-species-photo/large-Gorilla-photo.jpg', wordMap: '{"en":"gorilla","es":"gorila","fr":"gorille","de":"Gorilla","ja":"ゴリラ","ru":"горилла"}' },
    { id: 6, stars: 35, imgUrl: 'http://static2.jetpens.com/images/a/000/052/52677.jpg?s=2fdc7aac693dfa8a6144a79ee0dfa45e', wordMap: '{"en":"pencil","es":"lápiz","fr":"crayon","de":"Bleistift","ja":"鉛筆","ru":"карандаш"}' },
  ];
  const fakeDeckCardData = [
    { id: 1, deck_id: 1, card_id: 2, phrase: 'Hello, I am a cat!', timeInterval: 450000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 2, deck_id: 1, card_id: 5, phrase: 'Hello, I am a dog!', timeInterval: 900000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 3, deck_id: 2, card_id: 1, phrase: 'Hello, I am a hyena!', timeInterval: 900000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 4, deck_id: 2, card_id: 6, phrase: 'Hello, I am a leopard!', timeInterval: 900000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 5, deck_id: 2, card_id: 5, phrase: 'Hello, I am a zebra!', timeInterval: 900000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 6, deck_id: 3, card_id: 6, phrase: 'Hello, I am a lion!', timeInterval: 900000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 7, deck_id: 3, card_id: 4, phrase: 'Hello, I am a bear!', timeInterval: 1100000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 8, deck_id: 4, card_id: 3, phrase: 'Hello, I am a wolf!', timeInterval: 1100000, lastVisited: '2017-06-05 18:11:12.974-05' },
    { id: 9, deck_id: 4, card_id: 4, phrase: 'Hello, I am a human!', timeInterval: 1800000, lastVisited: '2017-06-05 18:11:12.974-05' },
  ];
  const fakeUserCardData = [
    { id: 1, user_id: 1, card_id: 6 },
    { id: 2, user_id: 1, card_id: 4 },
    { id: 3, user_id: 1, card_id: 3 },
    { id: 4, user_id: 2, card_id: 1 },
    { id: 5, user_id: 2, card_id: 6 },
    { id: 6, user_id: 2, card_id: 5 },
    { id: 7, user_id: 3, card_id: 2 },
    { id: 8, user_id: 3, card_id: 5 },
  ];

  describe('tester', () => {
      it('should exist', () => {
        expect(0).to.equal(0);
      });
  });

  describe('should have a POST /v1/users/findorcreate route', () => {
    it('should return a 200 status for valid request', (done) => {
      chai.request(server)
      .post('/v1/users/findorcreate')
      .send({
        facebookUsername: 'test123',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        token: '234567iuytresdfghjn345678',
        nativeLang: 'es',
        learnLang: 'ja',
        email: 'test123@gmail.com',
      })
      .end((err, res) => {
        // console.log(res.body, 'this is the response body');
        // expect(res.body.facebookUsername).to.equal('test123');
        // expect(res.body.token).to.equal('234567iuytresdfghjn345678');
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('should return the user when only one user is added to the database', (done) => {
    chai.request(server)
    .post('/v1/users/findorcreate')
    .send({
      facebookUsername: 'test123',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      token: '234567iuytresdfghjn345678',
      nativeLang: 'es',
      learnLang: 'ja',
      email: 'test123@gmail.com',
    })
    .end((err, res) => {
      expect(res.body.facebookUsername).to.equal('test123');
      expect(res.body.token).to.equal('234567iuytresdfghjn345678');
      done();
    });
  });

  it('should have the user in the database if the database is queried', (done) => {
    chai.request(server)
      .post('/v1/users/findorcreate')
      .send({
        facebookUsername: 'test123',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        token: '234567iuytresdfghjn345678',
        nativeLang: 'es',
        learnLang: 'ja',
        email: 'test123@gmail.com',
      })
      .then(() => {
        User.findAll({}).then(result => {
          expect(result.length).to.equal(12);
          done();
        });
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
  // describe('should have a GET /v1/users/all route', () => {
  //   it('should return an array of all users in the database', (done) => {

  //   });
  // });
});
