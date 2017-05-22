require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const PORT = process.env.PORT || 8080;
const pg = require('pg');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@localhost:5432/langsnap`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Postgres database established successfully.');
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



/////////////////////////// START MIDDLEWARE ///////////////////////////////

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('dev'));

/////////////////////////// END MIDDLEWARE ////////////////////////////////




// let clientDir = path.join(__dirname, '../../src/client')

// server.use(express.static(clientDir));

//////////////////////////// START SCHEMAS ////////////////////////////////

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  token: {
    type: Sequelize.STRING
  },
  nativeLang: {
    type: Sequelize.STRING
  }
});
User.sync();

const Deck = sequelize.define("deck", {
  name: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.STRING
  }
}, {
  classMethods: {
    associate: function(models) {
      Deck.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
});
Deck.sync();

const Card = sequelize.define("Card", {
  imgUrl: {
    type: Sequelize.STRING
  },
  phrase: {
    type: Sequelize.STRING
  },
  word: {
    type: Sequelize.STRING
  },
  solution: {
    type: Sequelize.STRING
  },
}, {
  classMethods: {
    associate: function(models) {
      Card.belongsToMany(models.Deck, { through: 'DeckCard' }),
      Deck.belongsToMany(models.Card, { through: 'DeckCard' })
    }
  }
});
Card.sync();

const DeckCard = sequelize.define("deckCard", {
  cardId: {
    type: Sequelize.STRING
  },
  deckId: {
    type: Sequelize.STRING
  }
});
DeckCard.sync();

const UserCardInfo = sequelize.define("userCardInfo", {
  lastVisited: {
    type: Sequelize.DATE
  },
  timeInterval: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.STRING
  }
}, {
  classMethods: {
    associate: function(models) {
      User.hasMany(UserCardInfo, { foreignKey: "userId" })
    }
  }
});
UserCardInfo.sync();

//////////////////////////////// END SCHEMAS ///////////////////////////////


// module.exports = (sequelize, DataTypes) => {
//   const TodoItem = sequelize.define('TodoItem', {
//     content: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     complete: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   }, {
//     classMethods: {
//       associate: (models) => {
//         TodoItem.belongsTo(models.Todo, {
//           foreignKey: 'todoId',
//           onDelete: 'CASCADE',
//         });
//       },
//     },
//   });
//   return TodoItem;
// };



/////////////////////////// START ENDPOINTS ///////////////////////////////

server.get('/', (req, res) => res.status(200).send('hello'));

server.post('/user', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const user = User.build({ firstName, lastName, username, email });
  user.save()
    .then(suc => res.status(200).send('Successfully added user to database'))
    .catch(err => console.error(err));
});

server.post('/deck', (req, res) => {
  const name = req.body.name;
  const userId = req.body.userId;
  Deck.create({ name, stars: 0, userId })
    .then(suc => res.status(200).send('Successfully added a new deck to database'))
    .catch(err => console.error(err));
});

server.post('/card', (req, res) => {
  const imgUrl = req.body.imgUrl;
  const phrase = req.body.phrase;
  const word = req.body.word;
  const solution = req.body.solution;
  const deckId = req.body.deckId;
  //what to do with deckId and table join???
  Card.create({ imgUrl, phrase, word, solution })
    .then(suc => res.status(200).send('Successfully added a new card to the database'))
    .catch(err => console.error(err));
});

/////////////////////////// END ENDPOINTS /////////////////////////////////