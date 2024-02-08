import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../service/anecdotes'
import { useNotificationDispatch } from './CounterContext'
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.addAnecdotes,
    onSuccess: (newAnecdotes) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdotes))
    },
    onError: () => {
      dispatch({ type: 'set', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => dispatch({ type: 'clear' }), 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate(content)
    dispatch({ type: 'set', payload: `anecdote '${content}' added!` })
    setTimeout(() => dispatch({ type: 'clear' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
