import { h } from '@cycle/dom'

export default function title (children) {
  return h('h1.title', { style: styles.root }, children)
}

const styles = {
  root: {
    'padding-left': 44,
    'padding-right': 44,
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'color': '#222'
  }
}
