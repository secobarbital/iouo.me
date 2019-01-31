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
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-PmY9l28YgO4JwMKbTvgaS7XNZJ30MK9FAZjjzXtlqyZCqBY6X6bXIkM++IkyinN+" crossOrigin="anonymous" />
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
  </div>
)
