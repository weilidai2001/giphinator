'use strict'
const should = require('chai').should()
const Q = require('q')

const DBClient = require('../../lib/external-clients/db-client')

const schemas = require('../../lib/schemas')({
  DATABASE_URL: process.env.DATABASE_URL
})

const dBClient = new DBClient(schemas.Giphys)

describe('db-client', function () {
  it('should retrieve a gif if url already exists', function (done) {
    Q.spawn(function * () {
      const searchTerm = 'cat'
      const url = 'http://fakeUrl.com'

      yield dBClient.delete(searchTerm)

      yield dBClient.save(searchTerm, url)

      const retrievedUrl = yield dBClient.get(searchTerm)
      retrievedUrl[0].should.be.equal(url)
      done()
    })
  })
})
