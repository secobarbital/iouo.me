/** @jsx hJSX */

import { Rx } from '@cycle/core'
import { hJSX } from '@cycle/dom'

export default function notfound () {
  return {
    DOM: Rx.Observable.just(
      <section>
        <h1>Not Found</h1>
      </section>
    )
  }
}
