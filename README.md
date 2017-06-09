# LangSnap

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

LangSnap is a language learning application that is empowered with modern technology.

  - Anki-style: Time interval training to learn most effectively
  - Object recognition allows you take a picture to make new cards from real world objects!
  - AR translation of text to another language

# Wireframes

![LangSnap Wireframes](./langsnap_wireframe.jpg?raw=true "Wireframes")

### Tech

LangSnap uses a number of open source projects to help you learn!:

![LangSnap Tech Stack](./langsnap_tech_stack.jpg?raw=true "Tech Stack")

* [Angular2] - HTML enhanced for web apps!
* [Ionic 2] - Hybrid app environment/wrapper to make web apps mobile friendly
* [PostgreSQL] - managing these complex queries to get your data
* [Sequelize] - creating queries with various SQL-based databases
* [NodeJS] - evented I/O for the backend
* [ExpressJS] - fast node.js network app framework
* [Docker] - rapid deployment using containers for environment consistency
* [Mocha] - Unit testing framework used to ensure consistent updates
* [Chai] - Assertion library to help with Mocha unit testing
* [TravisCI] - Perform testing for pull requests to organization codebase, quality assurance
* [Google] - Object recognition, translations
* [Oxford] - Sentences to learn from
* [Wordnik] - More sentences to learn from
* [Cloudinary] - image hosting on the web
* [Amazon Web Services] - Virtual Machines to hold our content publically accessible
* [Protractor] - End-to-end testing for db, server, and client integration
* [Adobe XD] - Wireframes and app design

### Schema
The schema for LangSnap was designed to allow the cards to store information that is large and card specific, not user specific. 
With this constraint, all information about a card that is specific to a user is kept in the deck_card join table since the deck is 
unique to the user (it stores a deck_id). 

![LangSnap DB Schema](./langsnap_schema.png?raw=true "Schema")

Summary of database schema: 
  - Users have user specific decks
  - Decks have many cards and cards have many decks
  - User specific information for a card in a user's deck is stored in the deck_card join table (this is the Anki style data)

### Installation / Config to work locally on project

LangSnap is structured to be in three separate parts:
  - LangSnap API Server
  - LangSnap Application
  - PostgreSQL Database

The API server and database are collectively in the langsnap_server repository (https://github.com/jalso-2/langsnap_server) 

The LangSnap application is served on its own server with the dist files.
The frontend application is at https://github.com/jalso-2/LangSnap

To use the API server:
  - psql installed
  - database called langsnap created using psql or similar
  - Node version 7.6.0 - 7.10.0 should be used
  - Create a .env file
  - .env file should have:
    - PORT     (dev default was 3000)
    - DATABASE_URL   (dev default was postgres://postgres:password@localhost:5432/langsnap   , change username/password for production)
    - GOOGLE_VISION
    - GOOGLE_VISION_KEY
    - WORDNIK_KEY
    - OXFORD_APP_KEY
    - OXFORD_APP_ID

Once configured run the following sequence of commands to get started and contribute!:
```sh
npm i
npm run dev
```
(Note: You need to have Nodemon installed to run in development mode. If you do not have Nodemon, install it or use 'npm start' instead)

To install the application and get contribution ready:
  - npm i -g ionic cordova
  - create a config.ts file inside of the src folder in the repo. This should have the following format:

```sh
import { Injectable } from ‘@angular/core’;

@Injectable()
export class Config {
    public facebook = {
        apiUrl: ‘https://graph.facebook.com/v2.3/',
        appId: ‘facebook_app_id’,
        scope: [‘scope_parameter’]
    };
    public cloudinary = {
        cloudId: ‘cloudinary_id’,
        uploadPreset: ‘cloudinary_preset’,
    }
    public serverUrl = ‘server_url’;
}
```

(Fill in the appId, scope, cloudId, uploadPreset, and serverUrl VALUES to be properly configured)

  - After this is completed, you also will need a few Cordova plugins, you should npm install each:

Camera, Text-to-Speech, and Social Sharing:
```sh
ionic cordova plugin add cordova-plugin-camera
npm install --save @ionic-native/camera
ionic cordova plugin add cordova-plugin-tts
npm install --save @ionic-native/text-to-speech 
ionic cordova plugin add cordova-plugin-x-socialsharing
npm install --save @ionic-native/social-sharing
```

  - Once all of this is complete, run the following commands as needed keeping in mind that authentication 
    using Ionic OAuth only works properly on mobile devices:

```sh
ionic cordova platform add android       (used to add the platform the initial time)
ionic cordova platform add ios     (used to add the platform the initial time)
ionic cordova build android      (used to rebuild the platform for testing each subsequent time)
ionic cordova build ios      (used to rebuild the platform for testing each subsequent time)
ionic serve          (to serve the into the browser, sometimes useful if auth temporarily disabled on a page)
```

### Redeploying the API server and database
Both the API server and database have been Dockerized to assist with consistency across all platforms. As a 
result, a docker-compose.yml file should be created in the deploy environment and run to redeploy. The 
docker-compose.yml file should look similar to the following but should have the INSERTs should be filled in.
Keep in mind that during development the database url and other credentials may be acceptable but should be 
changed for more secure values when moving to production.

```sh
version: "2"

services:
  langsnap_server:
    image: username/reponame
    ports:
      - 80:80
    command: bash -c 'while ! </dev/tcp/db/5432; do sleep 1; done; npm start;'
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/langsnap
      - PORT=80
      - GOOGLE_VISION=  'INSERT GOOGLE_VISION_KEY HERE'
      - GOOGLE_VISION_KEY=  'INSERT GOOGLE_VISION_KEY HERE'
      - WORDNIK_KEY=  'INSERT WORDNIK_KEY HERE'
      - OXFORD_APP_KEY= 'INSERT OXFORD_APP_KEY HERE'
      - OXFORD_APP_ID=  'INSERT OXFORD_APP_ID HERE'
  db:
    image: postgres
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=langsnap
```

Once this file has been copied and pasted into the deployed environment, docker and docker-compose should be installed
there as well. Once this is done, deployment is done by running the following commands:

```sh
sudo docker-compose pull
sudo docker-compose up -d
```

With these commands, the server and database should both be up and running. If any issues are encountered with database 
seeding, the server can be individually shut down and restarted to try to ensure seeding occurs. The following commands 
should be used to do this:

```sh
sudo docker ps     (find the container id)
sudo docker container stop container CONTAINER_ID_HERE
sudo docker-compose up -d
```

Finally, to shut down the containers before re-pulling new iterations, do the following:
```sh
sudo docker-compose down
sudo docker images     (note the image ids and remove them all with the following command)
sudo docker rmi IMAGE_ID_HERE     (perform rmi--remove image on each image id)
```

After completing this, update the docker.yml file if needed and then re-pulling, etc can be performed with the previous commands.
