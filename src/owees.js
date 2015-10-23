/** @jsx hJSX */

import Rx from 'rx'
import { hJSX } from '@cycle/dom'

export default function owees (allRoute$, { fetch }) {
  const page = 'owees'
  const fetch$ = fetch.byKey(page).switch()
  const route$ = allRoute$.filter(route => route.name === page)

  const fetchRequest$ = route$
    .map(({ name, params: { ower } }) => {
      return {
        key: name,
        url: `https://cors.5apps.com/?uri=http://stage.iouo.me/api/owers/${ower}/owees`
      }
    })

  const loading$ = route$
    .map(route => (
      <section>
        <h1>IOU: {route.params.ower}</h1>
        <p>Loading...</p>
      </section>
    ))

  const data$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
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

  const vtree$ = data$
    .withLatestFrom(route$, (owees, route) => {
      const ower = route.params.ower
      const oweeRows = owees.map(owee => (
        <a key={`${owee.ower}/${owee.name}`} href={`/owers/${owee.ower}/owees/${owee.name}`}>
          <dt>{owee.name}</dt>
          <dd>{owee.amount.toFixed(2)}</dd>
        </a>
      ))
      return (
        <section>
          <h1>IOU: {ower}</h1>
          <dl>{oweeRows}</dl>
        </section>
      )
    })

  return {
    dom: Rx.Observable.merge(loading$, vtree$),
    fetch: fetchRequest$
  }
}