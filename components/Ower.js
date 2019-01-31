import Link from 'next/link'

import Amount from './Amount'

export default ({ row }) => {
  const [ower] = row.key
  const amount = row.value.toFixed(2)
  const verb = amount > 0 ? 'owes' : 'is owed'
  const as = `/balances/${ower}`
  const href = {
    pathname: '/balances',
    query: { ower }
  }
  return (
    <Link href={href} as={as}>
      <a className="list-group-item list-group-link">
        @<span className="subject">{ower}</span>
        <span className="verb"> {verb} </span>
        <div className="list-group-link-rhs">
          <Amount amount={Math.abs(amount)} />
        </div>
      </a>
    </Link>
  )
}
