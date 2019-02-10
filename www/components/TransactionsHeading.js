import Link from "next/link";

import Amount from "./Amount";

export default ({ ower, owee, amount }) => {
  const owerHref = `/balances?ower=${ower}`;
  const owerRoute = `/balances/${ower}`;
  const owerLink = (
    <Link href={owerHref} as={owerRoute}>
      <a>@{ower}</a>
    </Link>
  );
  const oweeHref = `/balances?ower=${owee}`;
  const oweeRoute = `/balances/${owee}`;
  const oweeLink = (
    <Link href={oweeHref} as={oweeRoute}>
      <a>@{owee}</a>
    </Link>
  );
  if (amount > 0) {
    return (
      <div className="panel-heading clearfix">
        {owerLink} owes {oweeLink}
        <div className="panel-heading-rhs">
          <Amount amount={Math.abs(amount)} />
        </div>
      </div>
    );
  }
  if (amount < 0) {
    return (
      <div className="panel-heading clearfix">
        {oweeLink} owes {owerLink}
        <div className="panel-heading-rhs">
          <Amount amount={Math.abs(amount)} />
        </div>
      </div>
    );
  }
  return (
    <div className="panel-heading clearfix">
      {owerLink} and {oweeLink} are even
    </div>
  );
};
