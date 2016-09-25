'use strict'
const should = require('chai').should()

const GiphinatorClient = require('../../lib/external-clients/giphinator-client')
const requestClient = require('../../lib/external-clients/request-client')

const giphinatorClient = new GiphinatorClient(requestClient)

describe('giphinator-client', function () {
  it('should retrieve gifs', function (done) {
    const searchTerm = 'funny cat'
    const limit = 10

    giphinatorClient.getGifs(searchTerm, limit).then(urls => {
      urls.length.should.be.equal(limit)
      done()
    })
  })
})
