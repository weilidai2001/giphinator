const searchApi = 'http://api.giphy.com/v1/gifs/search';
const apiKey = 'dc6zaTOxFJmzC';

// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

const request = require('request');
const _ = require('lodash');

module.exports = function(){
  this.getGifs = function(searchTerm, limit){
    return new Promise((resolve, reject) => {
      const query = {
        url: searchApi,
        qs: {
          q: searchTerm,
          api_key: apiKey
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request(query, (err, res, body) => {
        if (err) {
          reject(err);
        }

        const extractedUrls = _(JSON.parse(body).data).take(limit).map(gif => gif.embed_url).value();
        resolve(extractedUrls);

      })
    });
  };
};