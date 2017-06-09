const axios = require('axios');

const languages = ['en', 'es', 'fr', 'de', 'ja', 'ru'];

module.exports = {

  sendUrlToGoogleVisionForName: url =>
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
    .then(resp => resp.data.responses[0].labelAnnotations)
    .catch(() => 'err'),

  sendUrlToGoogleVisionForOCR: url =>
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
                type: 'TEXT_DETECTION',
              },
            ],
          },
        ],
      },
    })
    .then(resp => resp.data.responses[0].textAnnotations[0].description)
    .catch(() => 'err'),

  getGoogleTranslateOfWord: (q, source) => {
    const langsToGet = languages.filter(lang => lang !== source);
    const promises = [];
    langsToGet.map(lang => promises.push(axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_VISION_KEY}`, {
      q,
      source,
      target: lang,
    })));
    return axios.all(promises)
      .then(axios.spread((...responses) => {
        const finalResponseObj = { [source]: q };
        responses.map((response, ind) => {
          finalResponseObj[langsToGet[ind]] = response.data.data.translations[0].translatedText;
          return 200;
        });
        return finalResponseObj;
      }))
      .catch(() => 'err');
  },

  getGoogleTranslateOfSentence: (q, source, target) =>
    axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_VISION_KEY}`,
      {
        q,
        source,
        target,
        format: 'text',
      })
        .then(transData => transData.data)
        .catch(() => 'err'),

  getSamplePhraseFromWordWordnik: queryWord =>
    axios.get(`http://api.wordnik.com:80/v4/word.json/${queryWord}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${process.env.WORDNIK_KEY}`)
      .then(response => response.data)
      .catch(() => 'err'),

  getSamplePhraseEnglishFromWordOxford: queryWord =>
    axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${queryWord}/sentences`, {
      headers: {
        Accept: 'application/json',
        app_id: process.env.OXFORD_APP_ID,
        app_key: process.env.OXFORD_APP_KEY,
      },
    })
      .then(response => response.data)
      .catch(() => 'err'),

};
