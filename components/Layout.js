import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Navbar } from 'react-bootstrap'

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
      <Navbar.Header>
        <Link href="/">
          <a className="navbar-brand">
            <span className="logotype">IOU</span>
          </a>
        </Link>
      </Navbar.Header>
    </nav>
    {children}
    <footer>
      <Link href="/owe"><Button bsStyle="primary" block>Owe someone</Button></Link>
    </footer>
  </div>
)
