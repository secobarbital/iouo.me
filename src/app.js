import { Rx } from '@cycle/core'
import { h } from '@cycle/dom'

function intent () {
}

function model () {
}

function view () {
}

function app (responses) {
  return {
    DOM: Rx.Observable.just(h('h1', {}, 'IOU'))
  }
}

export default app
