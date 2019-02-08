import accounting from 'accounting-js'

export default ({ amount }) => (
  <span>
    <span className="currency">$ </span>
    <span className="amount">{accounting.formatMoney(Math.abs(amount), { symbol: '' })}</span>
    <style jsx>{`
      .amount {
        font-size: 1.3em;
      }

      .amount, .currency {
        font-family: Georgia, Palatino, serif;
        line-height: 1;
      }
    `}</style>
  </span>
)
