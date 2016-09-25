'use strict';
const should = require("chai").should();

const GiphinatorClient = require("../../lib/external-clients/giphinator-client");
const giphinatorClient = new GiphinatorClient();

describe("giphinator-client", function () {
  it("should retrieve gifs", function (done) {
    const searchTerm = '';
    const limit = 10;

    giphinatorClient.getGifs(searchTerm, limit).then(gifs => {
      gifs.length.should.be.above(9);
      done();
    });
  });
});