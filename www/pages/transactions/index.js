import db from '../../config/db'
import Transactions from '../../components/Transactions'

const TransactionsPage = ({ err, ower, owee, rows, total }) => err
  ? <section><pre>{err}</pre></section>
  : <Transactions rows={rows} ower={ower} owee={owee} total={total} />

TransactionsPage.getInitialProps = async ({ query: { ower, owee } }) => {
  try {
    const params = {
      descending: true,
      reduce: false,
      include_docs: true,
      startkey: JSON.stringify([ower, owee, {}]),
      endkey: JSON.stringify([ower, owee])
    }
    const res = await db.view('iouome', 'balances', params)
    if (!res.rows) {
      return { err: JSON.stringify(res, null, 2) }
    }
    const rows = res.rows
    const total = rows.reduce((m, a) => m + a.value, 0)
    return { rows, ower, owee, total }
  } catch (err) {
    return { err: err.toString() }
  }
}

export default TransactionsPage
