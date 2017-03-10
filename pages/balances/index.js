import React from 'react'

import db from '../../config/db'
import Owees from '../../components/Owees'

export default class extends React.Component {
  static async getInitialProps ({ query: { ower } }) {
    try {
      const params = {
        group_level: 2,
        startkey: JSON.stringify([ower]),
        endkey: JSON.stringify([ower, {}])
      }
      const res = await db.view('iouome', 'balances', params)
      if (!res.rows) {
        return { err: JSON.stringify(res, null, 2) }
      }
      const rows = res.rows
        .sort((a, b) => b.value - a.value)
      const total = rows.reduce((m, a) => m + a.value, 0)
      return { rows, ower, total }
    } catch (err) {
      return { err: err.toString() }
    }
  }
  render () {
    const { err, ower, res, rows, total } = this.props
    if (rows) {
      return <Owees rows={rows} ower={ower} total={total} />
    }
    if (err) {
      return <section><pre>{err}</pre></section>
    }
  }
}
