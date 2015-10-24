import cx from 'classnames'
import hrt from 'human-readable-time'
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

function transactionRow (txn) {
  const { tweetId, createdAt, userId, userName, ower, owee, amount, text } = txn
  const left = amount > 0
  const link = `http://twitter.com/${userName}/status/${tweetId}`
  const avatar = `http://res.cloudinary.com/hkbr2rtli/image/twitter/w_42,h_42,c_fill/${userId}.jpg`
  const pullClass = cx({ 'pull-left': left, 'pull-right': !left })
  const dirStyle = left ? styles.left : styles.right
  const cellStyle = { ...dirStyle, ...styles.cell }

  return (
    h('li.table-view-cell.media', { key: tweetId, style: cellStyle }, [
      h('a', { href: link, style: styles.link }, [
        h('img.media-object', { src: avatar, className: pullClass, style: styles.avatar }),
        h('div.media-body', [
          h('p', [
            userName,
            ' ', String.fromCharCode(0xb7), ' ',
            hrt(new Date(createdAt), '%relative% ago')
          ]),
          text
        ])
      ])
    ])
  )
}

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

  const data$ = fetch$
    .flatMap(res => res.ok ? res.json() : Promise.resolve({ rows: [] }))
    .map(({ rows }) => rows
      .map(row => {
        const tweet = row.doc.raw
        return {
          tweetId: tweet.id_str,
          createdAt: new Date(tweet.created_at),
          userId: tweet.user.id_str,
          userName: tweet.user.screen_name,
          ower: row.key[0],
          owee: row.key[1],
          amount: row.value,
          text: tweet.text
        }
      })
      .sort((a, b) => b.createdAt - a.createdAt)
    )
    .map(txns => {
      return {
        total: txns.reduce((m, txn) => m + txn.amount, 0),
        txns: txns
      }
    })
    .startWith({
      total: 0,
      txns: []
    })
    .shareReplay(1)

  const loading$ = Rx.Observable.merge(
    route$.map(route => true),
    data$.map(data => false)
  )
  .startWith(true)

  const vtree$ = Rx.Observable.combineLatest(data$, route$)
    .withLatestFrom(loading$, ([ data, route ], loading) => {
      const { ower, owee } = route.params
      const { total, txns } = data
      const [ subject, object ] = total > 0 ? [ ower, owee ] : [ owee, ower ]
      const txnRows = txns
        .filter(txn => txn.ower === ower && txn.owee === owee)
        .map(transactionRow)

      return (
        h('article', [
          header([
            backButton({ href: `/owers/${ower}` }),
            logoType({ spin: loading, style: styles.logo }),
            title(`@${subject}`)
          ]),
          footer(
            button({ primary: true, block: true, href: `/owe/${owee}` }, `Owe @${owee}`)
          ),
          content([
            h('p.content-padded', { style: styles.subtitle }, loading ? `@${object}` : [
              total ?
                `owes @${object} $${Math.abs(total).toFixed(2)}` :
                `is even with @${object}`
            ]),
            txns.length ? h('ul.table-view', txnRows) : ''
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
  left: {
  },
  right: {
    'text-align': 'right'
  },
  cell: {
    'padding-right': '15px'
  },
  link: {
    'margin-right': '-15px'
  },
  subtitle: {
    'text-align': 'center'
  },
  avatar: {
    'width': '42px',
    'height': '42px'
  },
  quote: {
    'border': 'none'
  },
  logo: {
    'float': 'right',
    'line-height': '44px',
    'z-index': 20,
    'position': 'relative'
  }
}
