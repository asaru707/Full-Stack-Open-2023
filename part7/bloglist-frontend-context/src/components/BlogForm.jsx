import { useState } from 'react'
import blogService from '../services/blogs'
import { useNotificationDispatch } from './NotificationContext'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const BlogForm = ({ toggle }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const blogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
    },
  })

  const handleCreate = async (e) => {
    e.preventDefault()
    blogMutation.mutate({ title, author, url })

    toggle()

    dispatch({
      type: 'SET',
      payload: {
        type: 'success',
        message: `a new blog ${title} by ${author} added`,
      },
    })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            className='title'
            type='text'
          />
        </div>
        <div>
          author:
          <input
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
            type='text'
            className='author'
          />
        </div>
        <div>
          url:
          <input
            onChange={({ target }) => setUrl(target.value)}
            value={url}
            type='text'
            className='url'
          />
        </div>
        <button className='create-button'> create</button>
      </form>
    </div>
  )
}

export default BlogForm
