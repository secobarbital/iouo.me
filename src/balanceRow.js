import { h } from '@cycle/dom'

function getDisplayAmount (amount) {
  const value = Math.abs(amount).toFixed(2)

  return (
    h('span', { style: styles.amount }, [
      h('span', { style: styles.currency }, '$'),
      h('span', { style: styles.value }, value)
    ])
  )
}

function crossBalanceRow({ key, ower, owee, amount }) {
  const preVerb = amount > 0 ? 'owes' : ''
  const postVerb = amount < 0 ? 'owes' : amount ? 'is even' : ''

  return (
    h('li.table-view-cell', { style: styles.cell }, [
      h('a', { href: `/owers/${ower}/owees/${owee}`, style: styles.link}, [
        preVerb,
        preVerb && ' ',
        '@',
        h('span', { style: styles.subject }, owee),
        postVerb && ' ',
        postVerb,
        getDisplayAmount(amount)
      ])
    ])
  )
}

export default function balanceRow ({ key, ower, owee, amount }) {
  if (owee) return crossBalanceRow(...arguments)

  const verb = amount > 0 ? 'owes' : amount < 0 ? 'is owed' : 'is even'

  return (
    h('li.table-view-cell', { key, style: styles.cell }, [
      h('a', { href: `/owers/${ower}`, style: styles.link }, [
        '@',
        h('span', { style: styles.subject }, ower),
        ' ',
        verb,
        getDisplayAmount(amount)
      ])
    ])
  )
}

const styles = {
  subject: {
    'font-weight': 'bold'
  },
  currency: {
  },
  value: {
  },
  amount: {
    'float': 'right'
  },
  cell: {
    'padding-right': '15px'
  },
  link: {
    'padding-right': '15px',
    'margin-right': '-15px'
  }
}
