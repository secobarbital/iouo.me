import { h } from '@cycle/dom'

export default function notfound (route$) {
  const page = 'notfound'
  const vtree$ = route$
    .filter(route => route.name === page)
    .map(route => (
      h('section', [
        h('h1', 'Not Found'),
        h('p', [
          h('a', { href: '/' }, 'home')
        ])
      ])
    ))

  return {
    dom: vtree$
  }
}
