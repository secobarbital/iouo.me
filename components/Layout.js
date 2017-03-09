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
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/static/iouo.min.css" />
    </Head>
    <nav className="navbar" role="navigation">
      <div className="navbar-header">
        <Link href="/">
          <a className="navbar-brand">
            <span className="logotype">IOU</span>
          </a>
        </Link>
      </div>
    </nav>
    {children}
    <footer>
      <Link href="/owe"><a className="btn btn-primary btn-block">Owe someone</a></Link>
    </footer>
  </div>
)
