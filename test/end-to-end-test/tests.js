'use strict'
const should = require('chai').should()
const request = require('supertest')
const Q = require('q')
const app = require('../../app')
const DBClient = require('../../lib/external-clients/db-client')

const schemas = require('../../lib/schemas')({
  DATABASE_URL: process.env.DATABASE_URL
})

const dBClient = new DBClient(schemas.Giphys)


describe('GET searchTerm', function () {
  it('responds with a url', function (done) {
    request(app)
      .get('/mouse')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.gifUrl.should.have.string('http://giphy.com/embed')
      })
      .expect(200, done)
  })

  it('should populate the database with the term and url', function (done) {
    Q.spawn(function *() {
      const searchTerm = 'mouse'

      yield dBClient.delete(searchTerm)

      const initialDBRetrieve = yield dBClient.get(searchTerm)
      initialDBRetrieve.length.should.be.equal(0)

      yield request(app)
        .get(`/${searchTerm}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.gifUrl.should.have.string('http://giphy.com/embed')
        })
        .expect(200)

      const secondDBRetrieve = yield dBClient.get(searchTerm)
      secondDBRetrieve.length.should.be.equal(1)

      done()
    })

  })
})

describe('DELETE searchTerm', function () {
  it('responds with a deleted true', function (done) {
    request(app)
      .delete('/mouse')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.deleted.should.be.equal(true)
      })
      .expect(200, done)
  })

  it('should delete cached searchTerm from DB', function (done) {
    Q.spawn(function *() {
      const searchTerm = 'mouse'
      const url = 'http://fakeUrl.com'

      yield dBClient.delete(searchTerm)
      yield dBClient.save(searchTerm, url)

      yield request(app)
        .delete('/mouse')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.deleted.should.be.equal(true)
        })
        .expect(200)

      const secondDBRetrieve = yield dBClient.get(searchTerm)
      secondDBRetrieve.length.should.be.equal(0)

      done()
    })
  })
})
