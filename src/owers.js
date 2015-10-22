/** @jsx hJSX */

import Rx from 'rx'
import { hJSX } from '@cycle/dom'

export default function owers (allRoute$, { fetch }) {
  const page = 'owers'
  const fetch$ = fetch.byKey(page).switch()
  const route$ = allRoute$.filter(route => route.name === page)

  const fetchRequest$ = route$
    .map(({ name }) => {
      return {
        key: name,
        url: 'https://cors.5apps.com/?uri=http://stage.iouo.me/api/owers'
      }
    })

  const loading$ = route$
    .map(route => (
      <section>
        <h1>IOU</h1>
        <p>Loading...</p>
      </section>
    ))

  const data$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
    .map(data => data.rows
      .sort((a, b) => a.value - b.value)
      .map(row => {
        return {
          name: row.key[0],
          amount: row.value
        }
      })
    )

  const vtree$ = data$
    .map(owers => {
      const owerRows = owers
        .map(ower => (
          <a key={ower.name} href={`/owers/${ower.name}`}>
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
    dom: Rx.Observable.merge(loading$, vtree$),
    fetch: fetchRequest$
  }
}
