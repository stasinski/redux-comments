import React from 'react'
import SingleComment from './SingleComment'

const CommentList = ({ comments }) => {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <SingleComment comment={comment} key={comment.id} />
      ))}
    </div>
  )
}

export default CommentList
