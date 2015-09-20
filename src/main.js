/** @jsx hJSX */

import { run, Rx } from '@cycle/core'
import { makeDOMDriver, hJSX } from '@cycle/dom'
import { makeFetchDriver } from './fetch-driver'

function main ({ DOM, Fetch }) {
  const fetchRequest$ = Rx.Observable
    .just({
      url: '/owers.json'
    })
  const vtree$ = Fetch
    .flatMap(res => res.json())
    .startWith({ rows: [] })
    .map(data => data.rows
      .sort((a, b) => a.value - b.value)
      .map(row => {
        return {
          name: row.key[0],
          amount: row.value
        }
      })
    )
    .map(owers => {
      let owerRows = owers
        .map(ower => <p>{ower.name} {ower.amount}</p>)
      return (
        <section>
          <h1>IOU</h1>
          {owerRows}
        </section>
      )
    })

  return {
    DOM: vtree$,
    Fetch: fetchRequest$
  }
}

run(main, {
  DOM: makeDOMDriver('main'),
  Fetch: makeFetchDriver()
})
