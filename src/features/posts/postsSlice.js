import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
  }
)

export const addPostComment = createAsyncThunk(
  'posts/addNewComment',
  async ({ id, text, author }) => {
    const response = await client.post('/fakeApi/comments', {
      id,
      text,
      author,
    })
    return response
  }
)

export const addCommentReply = createAsyncThunk(
  'posts/addCommentReply',
  async ({ postId, commentId, text, author }) => {
    const response = await client.post('/fakeApi/commentreply', {
      postId,
      commentId,
      text,
      author,
    })
    return response
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
    },
    [addPostComment.fulfilled]: (state, { payload }) => {
      const post = state.posts.find((post) => post.id === payload.post)
      post.comments.push(payload)
    },
    [addCommentReply.fulfilled]: (state, { payload }) => {
      const post = state.posts.find((post) => post.id === payload.post)
      post.comments = post.comments.map((comment) => {
        if (comment.id === payload.comment) {
          return {
            ...comment,
            replys: [...comment.replys, payload.reply],
          }
        } else {
          return comment
        }
      })
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
