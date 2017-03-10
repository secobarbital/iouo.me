import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from './Layout'
import Ower from './Ower'

export default ({ balances }) => (
  <Layout>
    <section>
      <div className="list-group">
        {balances && balances.map((balance) => <Ower key={balance.key[0]} balance={balance} />)}
      </div>
    </section>
  </Layout>
)
