/** @jsx hJSX */

require('es6-promise').polyfill()
import 'whatwg-fetch'
import { run, Rx } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeFetchDriver } from '@cycle/fetch'
import { makeNavigationDriver } from 'cycle-navigation-driver'
import { makePreventDefaultDriver } from './preventDefaultDriver'
import route from './route'
import owers from './owers'
import owees from './owees'
import notFound from './notfound'

function main ({ DOM, Fetch, URL }) {
  const Route = route(URL)

  const owersRequests = owers({ Fetch, Route })
  const oweesRequests = owees({ Fetch, Route })
  const notFoundRequests = notFound()

  const fetchRequest$ = Rx.Observable.merge(
    owersRequests.Fetch,
    oweesRequests.Fetch
  )

  const localLinkClick$ = DOM.select('a').events('click')
    .filter(e => e.currentTarget.host === global.location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const vtree$ = Rx.Observable.combineLatest(
    Route, owersRequests.DOM, oweesRequests.DOM, notFoundRequests.DOM,
    (route, owersPage, oweesPage, notFoundPage) => {
      const pages = {
        'owers': owersPage,
        'owees': oweesPage,
        'notfound': notFoundPage
      }
      return pages[route.name]
    }
  )

  return {
    DOM: vtree$,
    Fetch: fetchRequest$,
    URL: navigate$,
    preventDefault: localLinkClick$
  }
}

run(main, {
  DOM: makeDOMDriver('main'),
  Fetch: makeFetchDriver(),
  URL: makeNavigationDriver(),
  preventDefault: makePreventDefaultDriver()
})
