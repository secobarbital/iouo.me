import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ListGroup from 'react-bootstrap/lib/ListGroup'

import Balance from './Balance'
import Layout from './Layout'

export default ({ balances }) => (
  <Layout>
    <section>
      <ListGroup>
        {balances && balances.map((balance) => <Balance key={balance.key[0]} balance={balance} />)}
      </ListGroup>
    </section>
  </Layout>
)
