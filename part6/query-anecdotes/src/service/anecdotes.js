import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addAnecdotes = async (content) => {
  const anecdote = {
    id: getId(),
    content,
    votes: 0,
  }
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const voteAnecdotes = async (anecdote) => {
  anecdote.votes++
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}

export default { getAnecdotes, addAnecdotes, voteAnecdotes }
