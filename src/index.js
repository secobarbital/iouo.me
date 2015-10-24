require('es6-promise').polyfill()
import 'whatwg-fetch'
import Rx from 'rx'
import { run } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeFetchDriver } from '@cycle/fetch'
import { makePushStateDriver } from 'cycle-pushstate-driver'
import vtreeSwitcher from 'cycle-vtree-switcher'

import routes from './routes'

function main (responses) {
  const { dom } = responses

  const localLinkClick$ = dom.select('a').events('click')
    .filter(e => e.currentTarget.host === global.location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const [vtree$, requestMap] = vtreeSwitcher(routes, responses)
  const pageNames = Object.keys(requestMap)

  const fetchRequest$s = pageNames
    .map(name => requestMap[name].fetch)
    .filter(request$ => request$)

  const fetchRequest$ = Rx.Observable.merge(...fetchRequest$s)

  return {
    dom: vtree$,
    fetch: fetchRequest$,
    path: navigate$,
    preventDefault: localLinkClick$
  }
}

run(main, {
  dom: makeDOMDriver('body'),
  fetch: makeFetchDriver(),
  path: makePushStateDriver(),
  preventDefault: prevented$ => prevented$.subscribe(e => e.preventDefault())
})
