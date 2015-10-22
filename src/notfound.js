/** @jsx hJSX */

import { hJSX } from '@cycle/dom'

export default function notfound (route$) {
  const vtree$ = route$
    .map(route => (
      <section>
        <h1>Not Found</h1>
      </section>
    ))

  return {
    dom: vtree$
  }
}
