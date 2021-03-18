import { format } from 'date-fns'
import React from 'react'

const ReplyComment = ({ comment }) => {
  return (
    <article className="comment">
      <div className="comment-inner">
        <p className="comment__text">{comment.text}</p>
        <div className="comment__bottom">
          <h5>{comment.author}</h5>
          <p className="comment__time">{format(comment.createdAt, 'Pp')}</p>
        </div>
      </div>
    </article>
  )
}

export default ReplyComment
