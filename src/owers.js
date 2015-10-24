import Rx from 'rx'
import { h } from '@cycle/dom'

import balanceRow from './balanceRow'
import button from './button'
import content from './content'
import header from './header'
import footer from './footer'
import loading from './loading'
import logoType from './logoType'
import title from './title'

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

  const data$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
    .map(data => data.rows
      .sort((a, b) => b.value - a.value)
      .map(row => {
        return {
          name: row.key[0],
          amount: row.value
        }
      })
    )
    .startWith([])
    .shareReplay(1)

  const loading$ = Rx.Observable.merge(
    route$.map(route => true),
    data$.map(data => false)
  )
  .startWith(true)

  const vtree$ = Rx.Observable.combineLatest(data$, route$)
    .withLatestFrom(loading$, ([ owers, route ], loading) => {
      const owerRows = owers
        .map(({ name, amount }) => balanceRow({ key: name, ower: name, amount }))

      return (
        h('article', [
          header(
            title(
              logoType({ spin: loading })
            )
          ),
          footer(
            button({ primary: true, block: true, href: '/owe' }, 'Owe Someone')
          ),
          content([
            h('p.content-padded', 'Why pay when you can owe?'),
            owers.length ? h('.card', [
              h('ul.table-view', owerRows)
            ]) : ''
          ])
        ])
      )
    })
    .startWith(loading())

  return {
    dom: vtree$,
    fetch: fetchRequest$
  }
}
