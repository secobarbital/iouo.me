import { h } from '@cycle/dom'
import cx from 'classnames'

export default function logoType ({ spin }) {
  const classes = cx('fa', 'fa-refresh', {
    'fa-spin': spin
  })

  return h('span', [
    'I', h('i', { className: classes }), 'U'
  ])
}
