import React from 'react'
import { useSelector } from 'react-redux'

const CommentLoader = () => {
  const { fetchingComment } = useSelector((state) => state.posts)
  if (!fetchingComment) {
    return null
  }
  return <div className="loader">Loading...</div>
}

export default CommentLoader
