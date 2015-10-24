import { h } from '@cycle/dom'

export default function backButton ({ href }) {
  return (
    h('a.fa.fa-chevron-left', { href, style: styles.root })
  )
}

var styles = {
  root: {
    'position': 'relative',
    'float': 'left',
    'z-index': 20,
    'line-height': '44px',
    'font-size': '17px',
    'color': 'inherit'
  }
}
