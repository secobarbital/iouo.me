import fetchPonyfill from 'fetch-ponyfill'
import parse, { qs } from 'url-parse'
import { btoa } from 'isomorphic-base64'

const { fetch, Headers } = fetchPonyfill()

const parsed = parse(`${COUCHDB_URL_READONLY}/${COUCHDB_NAME}`, true)
const { auth } = parsed
parsed.set('username', '')
parsed.set('password', '')
const base = parsed.toString()

async function get (url) {
  const headers = new Headers()
  if (auth) {
    headers.append('Authorization', `Basic ${btoa(auth)}`)
  }
  const res = await fetch(url, { headers })
  return res.json()
}

export default {
  view (ddoc, view, params = {}) {
    const viewUrl = `${base}/_design/${ddoc}/_view/${view}`
    const query = qs.stringify(params)
    const url = query ? `${viewUrl}?${query}` : viewUrl
    return get(url)
  }
}
