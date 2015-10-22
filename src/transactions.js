/** @jsx hJSX */

import Rx from 'rx'
import { hJSX } from '@cycle/dom'

export default function transactions (allRoute$, { fetch }) {
  const page = 'transactions'
  const fetch$ = fetch.byKey(page).switch()
  const route$ = allRoute$.filter(route => route.name === page)

  const fetchRequest$ = route$
    .map(({ name, params: { ower, owee } }) => {
      return {
        key: name,
        url: `https://cors.5apps.com/?uri=http://stage.iouo.me/api/owers/${ower}/owees/${owee}/transactions`
      }
    })

  const loading$ = route$
    .map(route => (
      <section>
        <h1>IOU: {route.params.ower} {route.params.owee}</h1>
        <p>Loading...</p>
      </section>
    ))

  const data$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
    .map(data => data.rows
      .map(row => {
        const tweet = row.doc.raw
        return {
          id: tweet.id_str,
          created_at: tweet.created_at,
          name: row.doc.raw.user.screen_name,
          text: row.doc.raw.text
        }
      })
      .sort((a, b) => a.created_at - b.created_at)
    )

  const vtree$ = data$
    .withLatestFrom(route$, (transactions, route) => {
      const ower = route.params.ower
      const owee = route.params.owee
      const transactionRows = transactions.map(txn => (
        <a key={txn.id} href={`http://twitter.com/${txn.name}/status/${txn.id}`}>
          <dt>{txn.name} {txn.created_at}</dt>
          <dd>{txn.text}</dd>
        </a>
      ))
      return (
        <section>
          <h1>IOU: {ower} {owee}</h1>
          <dl>{transactionRows}</dl>
        </section>
      )
    })

  return {
    dom: Rx.Observable.merge(loading$, vtree$),
    fetch: fetchRequest$
  }
}
