import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default ({ children, title = 'iouo.me - why pay when you can owe?' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Why pay when you can owe?" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon-precomposed" href="/static/apple-touch-icon-precomposed.png" />
      <link rel="shortcut icon" href="/static/apple-touch-icon.png" />
    </Head>
    <nav className="navbar" role="navigation">
      <div className="navbar-header">
        <Link className="navbar-brand" href="/">
          <span className="logotype">IOU</span>
        </Link>
      </div>
    </nav>
    {children}
    <footer>
      <Link className="btn btn-primary btn-block" href="/owe">Owe someone</Link>
    </footer>
  </div>
)
