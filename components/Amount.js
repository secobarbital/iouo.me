import React from 'react'
import accounting from 'accounting'

export default ({ amount }) => (
   <span>
     <span className="currency">$ </span>
     <span className="amount">{accounting.formatMoney(Math.abs(amount), '')}</span>
   </span>
)
