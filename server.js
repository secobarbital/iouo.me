const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT || 3000)
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()
const owees = route('/balances/:ower')
const transactions = route('/transactions/:ower/:owee')

app.prepare()
.then(() => {
  createServer((req, res) => {
    const { pathname } = parse(req.url)
    const oweesParams = owees(pathname)
    if (oweesParams) {
      app.render(req, res, '/balances', oweesParams)
      return
    }
    const transactionsParams = transactions(pathname)
    if (transactionsParams) {
      app.render(req, res, '/transactions', transactionsParams)
      return
    }
    handle(req, res)
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
