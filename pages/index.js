import React from 'react'

import db from '../config/db'
import Balances from '../components/Balances'

export default class extends React.Component {
  static async getInitialProps () {
    const { rows } = await db.view('iouome', 'balances', { group_level: 1 })
    const balances = rows.sort((a, b) => b.value - a.value)
    return { balances }
  }
  render () {
    const { balances } = this.props
    return <Balances balances={balances} />
  }
}
