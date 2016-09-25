'use strict'

const Q = require('q')

const schemas = require('../schemas')({
  DATABASE_URL: process.env.DATABASE_URL
})

const DBClient = require('../../lib/external-clients/db-client')
const dBClient = new DBClient(schemas.Giphys)


const GiphinatorClient = require('../external-clients/giphinator-client')
const requestClient = require('../external-clients/request-client')
const giphinatorClient = new GiphinatorClient(requestClient)

/**
 * @params req.params.queryText {String} Text to query giphy for
 */
module.exports = function (req, res) {
  Q.spawn(function * () {
    const searchTerm = req.params.queryText

    const retrievedUrl = yield dBClient.get(searchTerm)

    if (retrievedUrl.length) {
      return res.send({
        gifUrl: retrievedUrl[0]
      })
    } else {
      const urls = yield giphinatorClient.getGifs(searchTerm, 1)
      dBClient.save(searchTerm, urls[0])
      return res.send({
        gifUrl: urls[0]
      })
    }

  })
}
