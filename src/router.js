import { Rx } from '@cycle/core'
import { makeRouter } from 'cycle-route'

export default function router (routes, responses) {
  const routeHandlers = Object.keys(routes).reduce((m, route) => {
    const handler = routes[route]
    m[handler.name] = handler
    return m
  }, {})
  const routeNames = Object.keys(routes).reduce((m, route) => {
    const handler = routes[route]
    m[route] = handler.name
    return m
  }, {})

  const names = Object.keys(routeHandlers)
  const nameIdx = names.reduce((m, name, i) => {
    m[name] = i
    return m
  }, {})

  const matchRoute = makeRouter(routeNames)
  const Route = responses.Path.map(matchRoute)

  const responsesWithRoute = { ...responses, Route }
  const requests = names.reduce((m, name) => {
    const handler = routeHandlers[name]
    m[name] = handler(responsesWithRoute)
    return m
  }, {})

  const vtree$s = names.map(name => requests[name].DOM)
  const vtree$ = Rx.Observable.combineLatest(
    Route, ...vtree$s,
    (route, ...vtrees) => vtrees[nameIdx[route.name]]
  )

  return [vtree$, requests]
}
