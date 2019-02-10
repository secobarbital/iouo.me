import db from "../../config/db";
import Owees from "../../components/Owees";

const Balances = ({ err, ower, rows, total }) =>
  err ? (
    <section>
      <pre>{err}</pre>
    </section>
  ) : (
    <Owees rows={rows} ower={ower} total={total} />
  );

Balances.getInitialProps = async ({ query: { ower } }) => {
  try {
    const params = {
      group_level: 2,
      startkey: JSON.stringify([ower]),
      endkey: JSON.stringify([ower, {}])
    };
    const res = await db.view("iouome", "balances", params);
    if (!res.rows) {
      return { err: JSON.stringify(res, null, 2) };
    }
    const rows = res.rows
      .filter(row => row.value)
      .sort((a, b) => b.value - a.value);
    const total = rows.reduce((m, a) => m + a.value, 0);
    return { rows, ower, total };
  } catch (err) {
    return { err: err.toString() };
  }
};

export default Balances;
