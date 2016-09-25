const searchApi = 'http://api.giphy.com/v1/gifs/search';

const _ = require('lodash');
const config = require('../../config');

module.exports = function(request){
  this.getGifs = function(searchTerm, limit){
    const params = {
      q: searchTerm,
      api_key: config.giphinator.api_key
    };

    const extractGifUrl = gifs => _(JSON.parse(gifs).data).take(limit).map(gif => gif.embed_url).value();

    return new Promise((resolve, reject) => {
      request.getJson(searchApi, params)
        .then(gifs => resolve(extractGifUrl(gifs)))
        .catch(reject)
    })
  };
};