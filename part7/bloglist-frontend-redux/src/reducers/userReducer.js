import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'userReducer',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
  },
})

export const removeUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('user')
    dispatch(set(null))
  }
}

export const { set } = userReducer.actions
export default userReducer.reducer
