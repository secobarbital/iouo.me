import accounting from 'accounting-js'

export default ({ amount }) => (
   <span>
     <span className="currency">$ </span>
     <span className="amount">{accounting.formatMoney(Math.abs(amount), '')}</span>
   </span>
)
