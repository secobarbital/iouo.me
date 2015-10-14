/** @jsx hJSX */

require('es6-promise').polyfill()
import 'whatwg-fetch'
import { run, Rx } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeFetchDriver } from '@cycle/fetch'
import { makeNavigationDriver } from 'cycle-navigation-driver'
import { makePreventDefaultDriver } from './preventDefaultDriver'
import owers from './owers'

function main (responses) {
  const { DOM, Fetch, URL } = responses

  const owersRequests = owers(responses)

  const fetchRequest$ = owersRequests.Fetch

  const localLinkClick$ = DOM.select('a').events('click')
    .filter(e => e.currentTarget.host === location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const vtree$ = Rx.Observable.combineLatest(
    URL, owersRequests.DOM,
    (url, owersPage) => {
      switch(url) {
        case '/':
          return owersPage
        default:
          return <h1>Not Found</h1>
      }
    })

  return {
    DOM: vtree$,
    Fetch: fetchRequest$,
    URL: navigate$,
    preventDefault: localLinkClick$
  }
}

let [ requests, responses ] = run(main, {
  DOM: makeDOMDriver('main'),
  Fetch: makeFetchDriver(),
  URL: makeNavigationDriver(),
  preventDefault: makePreventDefaultDriver()
})
