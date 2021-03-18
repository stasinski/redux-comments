import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentReply } from '../features/posts/postsSlice'

const ReplyForm = ({ postId, commentId, setShowReplys }) => {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text && author) {
      dispatch(addCommentReply({ postId, commentId, text, author }))
      setShowReplys(true)
    }

    setText('')
    setAuthor('')
  }

  return (
    <form className="comment_reply__form" onSubmit={(e) => handleSubmit(e)}>
      <div className="comment_reply__form-inner">
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="comment_reply-input"
            name="comment"
            placeholder="comment"
          />
        </div>
        <div className="comment_reply-bottom">
          <select
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="">--Select Author--</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            disabled={!text || !author}
            type="submit"
            className="comment_reply-btn"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ReplyForm
