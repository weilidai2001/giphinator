'use strict'

const express = require('express'),
    giphinateHandler = require('./lib/handlers/giphinate'),
    app = express()

app
.get('/:queryText', giphinateHandler)

.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`)
})
