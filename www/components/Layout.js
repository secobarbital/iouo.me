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
    <style jsx>{`
      @font-face {
        font-family: 'iouome';
        src:url('/static/fontawesome82497.eot');
        src:url('/static/fontawesome82497.eot?#iefix') format('embedded-opentype'),
          url('/static/fontawesome82497.woff') format('woff'),
          url('/static/fontawesome82497.ttf') format('truetype'),
          url('/static/fontawesome82497.svg#fontawesome') format('svg');
        font-weight: normal;
        font-style: normal;
      }

      .logotype {
        font-family: iouome;
      }
    `}</style>
    <style jsx global>{`
      section, footer {
        padding-left: 10px;
        padding-right: 10px;
      }

      footer {
        margin-bottom: 20px;
      }

      .list-group-link-rhs, .panel-heading-rhs {
        float: right;
      }

      .list-group-link-rhs:after {
        content: " \\3e";
        font-family: 'fontawesome';
      }

      .subject {
        font-weight: bold;
      }
    `}</style>
  </div>
)
