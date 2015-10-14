/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function owees ({ Fetch, URL }) {
  const fetch$ = Fetch.byKey('owees').mergeAll()
  const url$ = URL.filter(url => url === '/owers/secobarbital')

  const fetchRequest$ = url$.map(url => {
    return {
      key: 'owees',
      url: '/secobarbital.json'
    }
  })

  const vtree$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
    .startWith({ rows: [] })
    .map(data => data.rows
      .sort((a, b) => a.value - b.value)
      .map(row => {
        return {
          ower: row.key[0],
          name: row.key[1],
          amount: row.value
        }
      })
    )
    .map(owees => {
      let oweeRows = owees
        .map(owee => (
          <a key={`${owee.ower}/${owee.name}`} href={`/transactions/${owee.ower}/${owee.name}`}>
            <dt>{owee.name}</dt>
            <dd>{owee.amount.toFixed(2)}</dd>
            </a>
        )
      )
      return (
        <section>
          <h1>IOU</h1>
          <dl>{oweeRows}</dl>
        </section>
      )
    })

  return {
    DOM: vtree$,
    Fetch: fetchRequest$
  }
}
