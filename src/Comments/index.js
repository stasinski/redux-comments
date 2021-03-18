import React from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const CommentsWrapper = ({ comments, postId }) => {
  return (
    <div>
      <h3>Comments({comments.length})</h3>
      <CommentList comments={comments} />
      <CommentForm postId={postId} />
    </div>
  )
}

export default CommentsWrapper
