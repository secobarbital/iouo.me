import React from 'react'
import Link from 'next/link'

import Amount from './Amount'

export default ({ balance }) => {
  const [ower] = balance.key
  const amount = balance.value.toFixed(2)
  const verb = amount > 0 ? 'owes' : 'is owed'
  return (
    <Link className="list-group-item list-group-link" href="/balances/{ower}">
      <span className="subject">@{ower}</span>
      <span className="verb"> {verb} </span>
      <div className="list-group-link-rhs">
        <Amount amount={Math.abs(amount)} />
      </div>
    </Link>
  )
}
