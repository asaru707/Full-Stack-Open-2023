import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdoteId = action.payload.id
      return state.map((element) => {
        if (element.id === anecdoteId) return action.payload
        return element
      })
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.getOne(id)
    anecdote.votes++
    const res = await anecdotesService.voteAnecdote(anecdote)
    dispatch(voteAnecdote(res))
  }
}

export default anecdoteSlice.reducer
