/** @jsx hJSX */

require('es6-promise').polyfill()
import 'whatwg-fetch'
import { run, Rx } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeFetchDriver } from '@cycle/fetch'
import { makeNavigationDriver } from 'cycle-navigation-driver'
import { makePreventDefaultDriver } from './preventDefaultDriver'
import switchPath from 'switch-path'
import owers from './owers'
import owees from './owees'

function main (responses) {
  const { DOM, Fetch, URL } = responses

  const owersRequests = owers(responses)
  const oweesRequests = owees(responses)

  const fetchRequest$ = Rx.Observable.merge(
    owersRequests.Fetch,
    oweesRequests.Fetch
  )

  const localLinkClick$ = DOM.select('a').events('click')
    .filter(e => e.currentTarget.host === location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const vtree$ = Rx.Observable.combineLatest(
    URL, owersRequests.DOM, oweesRequests.DOM,
    (path, owersPage, oweesPage) => {
      const routes = {
        '/': owersPage,
        '/owers/:ower': oweesPage
      }
      const { value } = switchPath(path, routes)
      return value
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
