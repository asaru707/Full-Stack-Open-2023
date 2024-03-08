import { useNavigate } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  const navigate = useNavigate()
  return (
    <div>
      <h2 onClick={() => navigate('/')}>{anecdote.content}</h2>
      <div>have {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

export default Anecdote
