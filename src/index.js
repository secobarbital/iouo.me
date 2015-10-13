/** @jsx hJSX */

require('es6-promise').polyfill()
import 'whatwg-fetch'
import { run, Rx } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeFetchDriver } from 'cycle-fetch-driver'
import { makeURLDriver } from 'cycle-url-driver'
import { makePreventDefaultDriver } from './preventDefaultDriver'
import owers from './owers'

function main ({ DOM, Fetch, URL }) {
  const fetchRequest$ = URL
    .map(url => url === '/' ? '/owers.json' : `${url}.json`)

  const localLinkClick$ = DOM.select('a').events('click')
    .filter(e => e.currentTarget.host === location.host)

  const navigate$ = localLinkClick$
    .map(e => e.currentTarget.pathname)

  const vtree$ = URL
    .map(url => {
      switch(url) {
        case '/':
          return owers(Fetch)
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

run(main, {
  DOM: makeDOMDriver('main'),
  Fetch: makeFetchDriver(),
  URL: makeURLDriver(),
  preventDefault: makePreventDefaultDriver()
})
