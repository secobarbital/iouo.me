import { h } from '@cycle/dom'

import content from './content'
import logoType from './logoType'

export default function loading () {
  return (
    content(
      h('div', { style: styles.center }, [
        logoType({ spin: true })
      ])
    )
  )
}

const styles = {
  center: {
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    '-webkit-transform': 'translate(-50%,-50%)',
    '-ms-transform': 'translate(-50%,-50%)',
    'transform': 'translate(-50%,-50%)'
  }
}
