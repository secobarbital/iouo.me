import React from 'react'
import Link from 'next/link'
import { ListGroupItem } from 'react-bootstrap'

import Amount from './Amount'

export default ({ balance }) => {
  const [ower] = balance.key
  const amount = balance.value.toFixed(2)
  const verb = amount > 0 ? 'owes' : 'is owed'
  const link = `/balances/${ower}`
  return (
    <ListGroupItem href={link}>
      <span className="subject">@{ower}</span>
      <span className="verb"> {verb} </span>
      <div className="list-group-link-rhs">
        <Amount amount={Math.abs(amount)} />
      </div>
    </ListGroupItem>
  )
}
