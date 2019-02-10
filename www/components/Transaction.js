import Link from "next/link";
import TimeAgo from "react-timeago";

export default ({ ower, owee, total, row }) => {
  const tweet = row.doc.raw;
  const dir =
    (tweet.user.screen_name === owee) ^ (total > 0) ? "left" : "right";
  const href = `https://twitter.com/${tweet.user.id_str}/status/${
    tweet.id_str
  }`;
  const avatarClass = `media-object pull-${dir}`;
  const textClass = `media-body text-${dir}`;
  return (
    <a
      className="list-group-item media list-group-link list-group-media"
      href={href}
    >
      <img className={avatarClass} src={tweet.user.profile_image_url_https} />
      <div className={textClass}>
        <div>{tweet.text}</div>
        <small className="text-muted">
          &mdash; {tweet.user.screen_name} <TimeAgo date={tweet.created_at} />
        </small>
      </div>
      <style jsx>{`
        img {
          height: 40px;
          width: 50px;
        }

        .list-group-media {
          margin-top: 0;
        }
      `}</style>
    </a>
  );
};
