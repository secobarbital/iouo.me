import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Balance from './Balance'
import Layout from './Layout'

export default ({ balances }) => (
  <Layout>
    <section>
      <div className="list-group">
        {balances && balances.map((balance) => <Balance key={balance.key[0]} balance={balance} />)}
      </div>
    </section>
  </Layout>
)
