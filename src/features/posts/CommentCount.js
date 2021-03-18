import React from 'react'

const CommentCount = ({ count }) => {
  return (
    <span>
      , {count} {count === 1 ? 'comment' : 'comments'}
    </span>
  )
}

export default CommentCount
