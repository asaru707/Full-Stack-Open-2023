import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { type: '', message: '' },
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return { type: '', message: '' }
    },
  },
})

export const setNotification = (content, time = 10000) => {
  return async (dispatch) => {
    dispatch(set(content))
    setTimeout(() => {
      dispatch(remove())
    }, time)
  }
}
export const { set, remove } = notificationReducer.actions
export default notificationReducer.reducer
