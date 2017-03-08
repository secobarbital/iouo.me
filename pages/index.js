import React from 'react'
import 'isomorphic-fetch'

import Balances from '../components/Balances'

export default class extends React.Component {
  static async getInitialProps () {
    const res = await fetch('/_design/iouome/_view/balances?group_level=1')
    const json = await res.json()
    const { rows } = json
    return { balances: rows }
  }
  render () {
    const { balances } = this.props
    return <Balances balances={balances} />
  }
}
