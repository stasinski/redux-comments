import React from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import CommentLoader from './CommentLoader'

const CommentsWrapper = ({ comments, postId }) => {
  return (
    <div>
      <h3>Comments({comments.length})</h3>
      <CommentList comments={comments} />
      <CommentLoader />
      <CommentForm postId={postId} />
    </div>
  )
}

export default CommentsWrapper
