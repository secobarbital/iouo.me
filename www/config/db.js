import fetch from "isomorphic-unfetch";
import parse, { qs } from "url-parse";
import { btoa } from "isomorphic-base64";

const parsed = parse(`${process.env.COUCHDB_URL_READONLY}/${process.env.COUCHDB_NAME}`, true);
const { auth } = parsed;
parsed.set("username", "");
parsed.set("password", "");
const base = parsed.toString();

async function get(url) {
  const options = auth
    ? { headers: { Authorization: `Basic ${btoa(auth)}` } }
    : {};
  const res = await fetch(url, options);
  const json = await res.json();
  return json;
}

export default {
  view(ddoc, view, params = {}) {
    const viewUrl = `${base}/_design/${ddoc}/_view/${view}`;
    const query = qs.stringify(params);
    const url = query ? `${viewUrl}?${query}` : viewUrl;
    return get(url);
  }
};
