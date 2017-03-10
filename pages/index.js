import React from 'react'

import db from '../config/db'
import Owers from '../components/Owers'

export default class extends React.Component {
  static async getInitialProps () {
    try {
      const res = await db.view('iouome', 'balances', { group_level: 1 })
      if (!res.rows) {
        return { err: JSON.stringify(res, null, 2) }
      }
      const rows = res.rows
        .filter((row) => row.value)
        .sort((a, b) => b.value - a.value)
      return { rows }
    } catch (err) {
      return { err: err.toString() }
    }
  }
  render () {
    const { err, rows } = this.props
    return err
      ? <section><pre>{err}</pre></section>
      : <Owers rows={rows} />
  }
}
