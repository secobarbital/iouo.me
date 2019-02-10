import Head from "next/head";
import Link from "next/link";

import Amount from "./Amount";
import Layout from "./Layout";
import Transaction from "./Transaction";
import TransactionsHeading from "./TransactionsHeading";

export default ({ rows, ower, owee, total }) => (
  <Layout>
    <section className="transactions">
      <div className="panel panel-default">
        <TransactionsHeading ower={ower} owee={owee} amount={total} />
        <div className="list-group">
          {rows &&
            rows.map(row => (
              <Transaction
                key={row.doc.raw.id_str}
                ower={ower}
                owee={owee}
                total={total}
                row={row}
              />
            ))}
        </div>
      </div>
    </section>
  </Layout>
);
