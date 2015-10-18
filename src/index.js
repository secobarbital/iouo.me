require('es6-promise').polyfill()
import 'whatwg-fetch'
import { run, Rx } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeFetchDriver } from '@cycle/fetch'
import { makePushStateDriver } from 'cycle-pushstate-driver'
import vtreeSwitcher from 'cycle-vtree-switcher'

import { makePreventDefaultDriver } from './preventDefaultDriver'
import routes from './routes'

function main (responses) {
  const { DOM, Fetch, Path } = responses

  const localLinkClick$ = DOM.select('a').events('click')
    .filter(e => e.currentTarget.host === global.location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const [vtree$, requestMap] = vtreeSwitcher(routes, responses)
  const requests = Object.keys(requestMap).map(name => requestMap[name])
  const fetchRequest$s = requests
    .map(req => req.Fetch)
    .filter(req => req)

  const fetchRequest$ = Rx.Observable.merge(...fetchRequest$s)

  return {
    DOM: vtree$,
    Fetch: fetchRequest$,
    Path: navigate$,
    preventDefault: localLinkClick$
  }
}

run(main, {
  DOM: makeDOMDriver('main'),
  Fetch: makeFetchDriver(),
  Path: makePushStateDriver(),
  preventDefault: makePreventDefaultDriver()
})
