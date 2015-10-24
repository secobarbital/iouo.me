import { h } from '@cycle/dom'
import cx from 'classnames'

export default function logoType ({ spin, style }) {
  const className = cx({ 'fa-spin': spin })

  return h('span', { style }, [
    'I', h('i.fa.fa-refresh', { className }), 'U'
  ])
}
