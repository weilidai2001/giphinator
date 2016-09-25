'use strict'

const Q = require('q');

const schemas = require('../schemas')({
  DATABASE_URL: process.env.DATABASE_URL
})

const DBClient = require('../../lib/external-clients/db-client');
const dBClient = new DBClient(schemas.Giphys);

/**
 * @params req.params.queryText {String} Text to query giphy for
 */
module.exports = function (req, res) {
  Q.spawn(function* () {
    const searchTerm = req.params.queryText;

    yield dBClient.delete(searchTerm);

    res.send({
      deleted: true
    })

  });
}
