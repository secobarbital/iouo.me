/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function owers ({ Fetch, URL }) {
  const fetch$ = Fetch.byKey('owers').mergeAll()
  const url$ = URL.filter(url => url === '/')

  const fetchRequest$ = url$.map(url => {
    return {
      key: 'owers',
      url: '/owers.json'
    }
  })

  const vtree$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
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
        .map(ower => (
          <a key={ower} href={`/${ower.name}`}>
            <dt>{ower.name}</dt>
            <dd>{ower.amount.toFixed(2)}</dd>
            </a>
        )
      )
      return (
        <section>
          <h1>IOU</h1>
          <dl>{owerRows}</dl>
        </section>
      )
    })

  return {
    DOM: vtree$,
    Fetch: fetchRequest$
  }
}
