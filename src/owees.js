import Rx from 'rx'
import { h } from '@cycle/dom'

import backButton from './backButton'
import balanceRow from './balanceRow'
import button from './button'
import content from './content'
import header from './header'
import footer from './footer'
import loading from './loading'
import logoType from './logoType'
import title from './title'

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
    .shareReplay(1)

  const loading$ = Rx.Observable.merge(
    route$.map(route => true),
    data$.map(data => false)
  )

  const vtree$ = Rx.Observable.combineLatest(data$, route$)
    .withLatestFrom(loading$, ([ owees, route ], loading) => {
      const ower = route.params.ower
      const oweeRows = owees
        .filter(owee => owee.ower === ower && owee.name !== ower && owee.amount)
        .map(({ ower, name, amount }) => (
          balanceRow({ key: name, ower, owee: name, amount })
        ))

      return (
        h('article', [
          header([
            backButton({ href: '/' }),
            logoType({ spin: loading, style: styles.logo }),
            title(`@${ower}`)
          ]),
          footer(
            button({ primary: true, block: true, href: `/owe/${ower}` }, `Owe @${ower}`)
          ),
          content([
            h('p.content-padded', 'Why pay when you can owe?'),
            h('.card', [
              h('ul.table-view', oweeRows)
            ])
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

const styles = {
  subtitle: {
    'text-align': 'center'
  },
  logo: {
    'float': 'right',
    'line-height': '44px',
    'z-index': 20,
    'position': 'relative'
  }
}
