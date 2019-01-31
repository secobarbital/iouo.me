import Head from 'next/head'
import Link from 'next/link'

import Amount from './Amount'
import Layout from './Layout'
import Owee from './Owee'

function oweUrl (owee) {
  const text = encodeURIComponent(`@${owee} #iou $`)
  return `https://twitter.com/intent/tweet?text=${text}`
}

export default ({ rows, ower, total }) => (
  <Layout>
    <section className="balances">
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          @<span className="subject">{ower}</span>
          <span className="verb"> {total > 0 ? 'owes' : 'is owed'} </span>
          <div className="panel-heading-rhs">
            <Amount amount={Math.abs(total)} />
          </div>
        </div>
        <div className="list-group">
          {rows && rows.map((row) => <Owee key={row.key[1]} row={row} />)}
        </div>
      </div>
    </section>
    <footer>
      <a className="btn btn-primary btn-block" href={oweUrl(ower)}>Owe @{ower}</a>
    </footer>
  </Layout>
)
