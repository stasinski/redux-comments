import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment } from '../features/posts/postsSlice'

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text && author) {
      dispatch(addPostComment({ id: postId, text, author }))
    } else {
      alert('Something is wrong with your form')
    }
    setText('')
    setAuthor('')
  }

  return (
    <form className="comment__form" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="comment__form-input"
          name="comment"
          placeholder="comment"
        />
      </div>
      <div className="comment__form-bottom">
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
          className="comment__form-btn"
        >
          Add Comment
        </button>
      </div>
    </form>
  )
}

export default CommentForm
