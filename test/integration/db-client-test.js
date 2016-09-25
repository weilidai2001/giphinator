'use strict';
const should = require("chai").should();
const q = require('q');

describe("db-client", function () {
  it("should retrieve a gif if url already exists", function (done) {
    Q.spawn(function* (){
      yield dbClient.save(searchTerm);
      const url = yield dbClient.get(searchTerm);
      url.length.should.be.equal(limit);
      done();
    });
  });
});