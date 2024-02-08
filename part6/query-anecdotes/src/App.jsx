import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './service/anecdotes'
import { useNotificationDispatch } from './components/CounterContext'
const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: anecdotesService.voteAnecdotes,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((element) => {
          if (element.id === anecdote.id) return anecdote
          return element
        })
      )
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    dispatch({ type: 'set', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => dispatch({ type: 'clear' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (result.isError) return <div>anecdote service not availabe due to problems in server</div>

  if (result.isLoading) return <div>Loading...</div>

  let anecdotes = result.data

  anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
