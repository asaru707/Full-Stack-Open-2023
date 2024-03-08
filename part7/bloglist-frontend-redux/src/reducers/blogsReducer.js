import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsReducer = createSlice({
  name: 'blogsReducer',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    remove(state, action) {
      state = state.filter((state) => state.id !== action.payload)
      return state
    },
    like(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) return action.payload
        return blog
      })
    },
    update(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) return action.payload
        return blog
      })
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const likeBlog = (blogId, blogLike) => {
  return async (dispatch) => {
    const res = await blogService.updateBlogLike(blogId, blogLike)
    dispatch(like(res))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.createBlog(newBlog)
    if (blog.error) {
      return dispatch(setNotification({ type: 'error', message: 'failed' }))
    }

    dispatch(append(blog))
    dispatch(
      setNotification({
        type: 'success',
        message: `a new blog ${blog.title} by ${blog.author} added`,
      })
    )
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    const res = await blogService.removeBlog(blogId)
    if (res) dispatch(remove(blogId))
  }
}

export const { set, append, like, remove, update } = blogsReducer.actions
export default blogsReducer.reducer
