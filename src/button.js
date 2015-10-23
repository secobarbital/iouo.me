import { h } from '@cycle/dom'
import cx from 'classnames'

export default function button (props, children) {
  const {
    primary,
    positive,
    negative,
    block,
    link,
    outlined,
    href
  } = props
  const tag = href ? 'a' : 'button'
  const classNames = cx({
    'btn': true,
    'btn-primary': primary,
    'btn-positive': positive,
    'btn-negative': negative,
    'btn-block': block,
    'btn-link': link,
    'btn-outlined': outlined
  })

  return h(tag, { classNames, href }, children)
}
