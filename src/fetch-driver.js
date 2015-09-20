import {Rx} from '@cycle/core'
import 'whatwg-fetch'

export function makeFetchDriver () {
  return function fetchDriver (request$) {
    return request$
      .flatMap(({url, options}) => fetch(url, options))
  }
}
