'use strict'

// const schemas = require('../schemas')({
//   DATABASE_URL: process.env.DATABASE_URL
// })

const GiphinatorClient = require('../external-clients/giphinator-client');
const requestClient = require('../external-clients/request-client');
const giphinatorClient = new GiphinatorClient(requestClient);

/**
 * @params req.params.queryText {String} Text to query giphy for
 */
module.exports = function (req, res) {
  // call to the giphy API using the `req.params.queryText` string
  const searchTerm = req.params.queryText;
  return giphinatorClient.getGifs(searchTerm, 1).then(urls => {
    // return the the gif URL, cache it for the next time the same query is used
    return res.send({
      gifUrl: urls[0]
    })
  });


}
