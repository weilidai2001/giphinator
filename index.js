'use strict'

const express = require('express'),
  giphinateHandler = require('./lib/handlers/giphinate'),
  deleteCacheHandler = require('./lib/handlers/delete-cache-handler'),
  app = express()

app
  .get('/:queryText', giphinateHandler)
  .delete('/:queryText', deleteCacheHandler)

  .listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`)
  })
