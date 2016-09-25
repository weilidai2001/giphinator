'use strict'

const express = require('express'),
  giphinateHandler = require('./lib/handlers/giphinate'),
  deleteCacheHandler = require('./lib/handlers/delete-cache-handler'),
  app = express()

module.exports =  app
  .get('/:queryText', giphinateHandler)
  .delete('/:queryText', deleteCacheHandler)

