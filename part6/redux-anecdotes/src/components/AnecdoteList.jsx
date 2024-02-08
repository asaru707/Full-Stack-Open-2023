import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  let anecdotes = useSelector(({ filter, anecdote }) => {
    if (!filter) return anecdote
    return anecdote.filter(({ content }) => content.includes(filter))
  })
  const dispatch = useDispatch()

  const handleVote = (content, id) => {
    dispatch(vote(id))

    dispatch(setNotification(`you voted '${content}'`, 500))
  }
  anecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.content, anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
