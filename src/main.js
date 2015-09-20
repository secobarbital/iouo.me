import { run } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import app from './app'

run(app, {
  DOM: makeDOMDriver('main')
})
