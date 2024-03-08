import { createSlice } from '@reduxjs/toolkit'

const usersReducer = createSlice({
  name: 'usersReducer',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
  },
})

export const { set } = usersReducer.actions
export default usersReducer.reducer
