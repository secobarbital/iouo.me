import { h } from '@cycle/dom'

export default function content (children) {
  return (
    h('.content', { style: styles.root }, children)
  )
}

const styles = {
  root: {
    'background-color': 'whitesmoke',
    'color': '#555'
  }
}
