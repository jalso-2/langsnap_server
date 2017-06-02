const axios = require('axios');

const languages = ['en', 'es', 'fr', 'de', 'ja', 'ru'];

module.exports = {
  sendUrlToGoogleVisionForName: (url, res) => {
    axios({
      method: 'post',
      url: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_KEY}`,
      data: {
        requests: [
          {
            image: {
              source: {
                imageUri:
                  url,
              },
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 5,
              },
            ],
          },
        ],
      },
    })
    .then(resp =>
      res.status(200).send(resp.data.responses[0].labelAnnotations))
    .catch(err =>
      res.status(400).send(err));
  },
  getGoogleTranslateOfWord: async (q, source, res) => {
    const langsToGet = languages.filter(lang => lang !== source);
    const promises = [];
    langsToGet.map(lang => promises.push(axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_VISION}`, {
      q,
      source,
      target: lang,
    })));
    axios.all(promises)
      .then(axios.spread((...responses) => {
        const finalResponseObj = { [source]: q };
        responses.map((response, ind) => {
          finalResponseObj[langsToGet[ind]] = response.data.data.translations[0].translatedText;
          return 'OK';
        });
        res.status(200).send(finalResponseObj);
      }))
      .catch(err => res.status(400).send(err));
  },
  getGoogleTranslateOfSentence: (q, source, target, res) => {
    axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_VISION}`,
      {
        q,
        source,
        target,
        format: 'text',
      })
        .then(transData => res.status(200).send(transData.data))
        .catch(err => res.status(400).send(err));
  },
  getSamplePhraseFromWordWordnik: (queryWord, res) => {
    axios.get(`http://api.wordnik.com:80/v4/word.json/${queryWord}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${process.env.WORDNIK_KEY}`)
      .then(response => res.status(200).send(response.data))
      .catch(err => res.status(400).send(err));
  },
  getSamplePhraseEnglishFromWordOxford: (queryWord, res) => {
    axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${queryWord}/sentences`, {
      headers: {
        Accept: 'application/json',
        app_id: process.env.OXFORD_APP_ID,
        app_key: process.env.OXFORD_APP_KEY,
      },
    })
      .then(response => res.status(200).send(response.data))
      .catch(err => res.status(400).send(err));
  },
};
