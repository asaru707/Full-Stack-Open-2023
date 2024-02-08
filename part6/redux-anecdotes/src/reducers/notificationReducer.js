import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'anecdoteNotification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
