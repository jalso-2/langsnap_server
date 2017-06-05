const server = require('../server').server;
const User = require('../db_schema/user/user_schema');
const Deck = require('../db_schema/deck/deck_schema');
const Card = require('../db_schema/card/card_schema');
const DeckCard = require('../db_schema/deck_card/deck_card_schema');
const UserCard = require('../db_schema/user_card/user_card_schema');
const dbHelpers = require('../db_schema/db_helpers_fxns');
const apiHelpers = require('../api_helpers/api_helpers');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);
describe('Langsnap API server', () => {

  const fakeUserData = [];
  const fakeDeckData = [];
  const fakeCardData = [];
  const fakeUserCardData = [];
  const fakeDeckCardData = [];

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
