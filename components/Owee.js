import Link from 'next/link'

import Amount from './Amount'

export default ({ row }) => {
  const [ower, owee] = row.key
  const amount = row.value.toFixed(2)
  const verb = amount > 0 ? 'owes' : 'is owed'
  const href = `/transactions?ower=${ower}&owee=${owee}`
  const route =  `/transactions/${ower}/${owee}`
  if (amount > 0) {
    return (
      <Link href={href} as={route}>
        <a className="list-group-item list-group-link">
          <span className="verb"> owes </span>
          @<span className="subject">{owee}</span>
          <div className="list-group-link-rhs">
            <Amount amount={Math.abs(amount)} />
          </div>
        </a>
      </Link>
    )
  }
  if (amount < 0) {
    return (
      <Link href={href} as={route}>
        <a className="list-group-item list-group-link">
          @<span className="subject">{owee}</span>
          <span className="verb"> owes </span>
          <div className="list-group-link-rhs">
            <Amount amount={Math.abs(amount)} />
          </div>
        </a>
      </Link>
    )
  }
  return (
    <Link href={href} as={route}>
      <a className="list-group-item list-group-link">
        @<span className="subject">{owee}</span>
        <span className="verb"> is even </span>
      </a>
    </Link>
  )
}
