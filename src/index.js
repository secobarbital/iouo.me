/** @jsx hJSX */

require('es6-promise').polyfill()
import 'whatwg-fetch'
import switchPath from 'switch-path'
import { run, Rx } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeFetchDriver } from '@cycle/fetch'
import { makeNavigationDriver } from 'cycle-navigation-driver'
import { makePreventDefaultDriver } from './preventDefaultDriver'
import routes from './routes'
import owers from './owers'
import owees from './owees'

function main ({ DOM, Fetch, URL }) {
  const Route = URL
    .map(path => switchPath(path, routes).value)

  const owersRequests = owers({ Fetch, Route })
  const oweesRequests = owees({ Fetch, Route })

  const fetchRequest$ = Rx.Observable.merge(
    owersRequests.Fetch,
    oweesRequests.Fetch
  )

  const localLinkClick$ = DOM.select('a').events('click')
    .filter(e => e.currentTarget.host === location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const vtree$ = Rx.Observable.combineLatest(
    Route, owersRequests.DOM, oweesRequests.DOM,
    (route, owersPage, oweesPage) => {
      const pages = {
        'owers': owersPage,
        'owees': oweesPage
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
