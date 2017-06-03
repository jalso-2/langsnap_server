# LangSnap

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

LangSnap is a language learning application that is empowered with modern technology.

  - Anki-style: Time interval training to learn most effectively
  - Object recognition allows you take a picture to make new cards from real world objects!
  - AR translation of text to another language

# Wireframes

![LangSnap Wireframes](./langsnap_wireframe.jpg?raw=true "Wireframes")

### Tech

LangSnap uses a number of open source projects to work properly:

![LangSnap Tech Stack](./langsnap_tech_stack.jpg?raw=true "Tech Stack")

* [Angular2] - HTML enhanced for web apps!
* [Ionic 2] - Hybrid app environment/wrapper to make web apps mobile friendly
* [PostgreSQL] - managing these complex queries to get your data
* [Sequelize] - creating queries with various SQL-based databases
* [NodeJS] - evented I/O for the backend
* [ExpressJS] - fast node.js network app framework
* [Docker] - rapid deployment using containers for environment consistency
* [Google] - Object recognition, translations
* [Oxford] - Sentences to learn from
* [Wordnik] - More sentences to learn from
* [Cloudinary] - image hosting on the web
* [Amazon Web Services] - Virtual Machines to hold our content publically accessible
* [Karma] - Unit testing framework for testing single pieces of code
* [Protractor] - End-to-end testing for db, server, and client integration

### Schema

![LangSnap DB Schema](./langsnap_schema.png?raw=true "Schema")

Explanation of database schema: 
  - Users have user specific decks
  - Decks have many cards and cards have many decks
  - User specific information for a card in a user's deck is stored in the deck_card join table (this is the Anki style data)

### Installation

LangSnap is structured to be in three separate parts:
  - LangSnap API Server
  - LangSnap Application ()
  - PostgreSQL Database

The API server and database are collectively in the langsnap_server repository (https://github.com/jalso-2/langsnap_server) 

The LangSnap application is served on its own server with the dist files.
The frontend server is at https://github.com/jalso-2/langsnap_fe_server
The frontend application is at https://github.com/jalso-2/LangSnap

To install the API server:
  - Node version 7.6.0 - 7.10.0 should be used
  - Create a .env file
  - .env file should have:
    - PORT
    - DATABASE_URL
    - GOOGLE_VISION
    - WORDNIK_KEY
    - OXFORD_APP_KEY
    - OXFORD_APP_ID

Once configured run the following sequence of commands to get started and contribute!:
```sh
npm i
npm run dev
```

(Note: You need to have Nodemon installed to run in development mode. If you do not have Nodemon, install it or use 'npm start' instead)



To install the FrontEnd server:

```sh
npm i
npm start
```



To install the application and get contribution ready:
  - npm i -g ionic cordova
  - //install IONIC
  - create config.ts file with???

