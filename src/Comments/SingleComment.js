import { format } from 'date-fns'
import React, { useState } from 'react'

import ReplyComment from './ReplayComment'
import ReplyForm from './ReplyForm'

const SingleComment = ({ comment }) => {
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [showReplys, setShowReplys] = useState(false)
  return (
    <article className="comment">
      <div className="comment-inner">
        <p className="comment__text">{comment.text}</p>
        <div className="comment__bottom">
          <h5>{comment.author}</h5>
          <p className="comment__time">{format(comment.createdAt, 'Pp')}</p>
          <button
            className="comment__btn"
            onClick={() => setShowReplys((e) => !e)}
          >
            show replys ({comment.replys.length})
          </button>
          <button
            className="comment__btn"
            onClick={() => setShowResponseForm((e) => !e)}
          >
            Reply
          </button>
        </div>
      </div>
      {showReplys && (
        <div className="comment__replys">
          {comment.replys.map((com) => (
            <ReplyComment comment={com} key={com.id} />
          ))}
        </div>
      )}
      {showResponseForm && (
        <ReplyForm
          setShowReplys={setShowReplys}
          commentId={comment.id}
          postId={comment.post}
        />
      )}
    </article>
  )
}

export default SingleComment
