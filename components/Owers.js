import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from './Layout'
import Ower from './Ower'

export default ({ rows }) => (
  <Layout>
    <section>
      <div className="list-group">
        {rows && rows.map((row) => <Ower key={row.key[0]} row={row} />)}
      </div>
    </section>
  </Layout>
)
