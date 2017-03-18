import React from 'react'
import Link from 'next/link'

export default ({ ower, owee, total, row }) => {
  const tweet = row.doc.raw
  const dir = tweet.user.screen_name === owee ^ total > 0 ? 'left' : 'right'
  const href = `https://twitter.com/${tweet.user.id_str}/status/${tweet.id_str}`
  const avatarClass = `media-object pull-${dir}`
  const textClass = `media-body text-${dir}`
  const timestamp = new Date(tweet.created_at)
  return (
    <a className="list-group-item media list-group-link list-group-media" href={href}>
      <img className={avatarClass} src={tweet.user.profile_image_url} />
      <div className={textClass}>
        <div>{tweet.text}</div>
        <small className="text-muted">
          &mdash; {tweet.user.screen_name} <time datetime={timestamp.toISOString()}>at {timestamp.toString()}</time>
        </small>
      </div>
    </a>
  )
}
