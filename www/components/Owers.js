import Head from "next/head";
import Link from "next/link";

import Layout from "./Layout";
import Ower from "./Ower";

export default ({ rows }) => (
  <Layout>
    <section>
      <div className="list-group">
        {rows && rows.map(row => <Ower key={row.key[0]} row={row} />)}
      </div>
    </section>
    <footer>
      <Link href="/owe">
        <a className="btn btn-primary btn-block">Owe someone</a>
      </Link>
    </footer>
  </Layout>
);
