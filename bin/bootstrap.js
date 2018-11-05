#!/usr/bin/env node

require('dotenv').config()

const bootstrap = require('couchdb-bootstrap')

bootstrap(process.env.COUCHDB_URL, 'couchdb', function (error, response) {
  if (error) {
    console.error('ERROR:', error.stack)
    process.exit(1)
  }
  console.log(JSON.stringify(response, null, 2))
  process.exit()
})
