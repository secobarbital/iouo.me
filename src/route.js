import { Rx } from '@cycle/core'
import wayfarer from 'wayfarer'

export default function route (path$) {
  const route$ = new Rx.ReplaySubject(1)
  const r = name => params => route$.onNext({ name, params })

  const router = wayfarer('/notfound')
  router.on('/', r('owers'))
  router.on('/owers/:ower', r('owees'))
  router.on('/transactions/:ower/:owee', r('transactions'))
  router.on('/notfound', r('notfound'))

  path$
    .subscribe(
      path => router(path),
      route$.onError.bind(route$),
      route$.onCompleted.bind(route$)
    )
  return route$
}
