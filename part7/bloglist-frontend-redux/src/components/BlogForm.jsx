import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Button, Card, Form } from 'react-bootstrap'
const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errors, setError] = useState({})

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title) return setError({ ...errors, title: 'title required' })
    if (!author) return setError({ ...errors, author: 'author required' })
    if (!url) return setError({ ...errors, url: 'url required' })
    dispatch(createBlog({ title, author, url }))
    toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <h2>create new</h2>
      </div>
      <Form onSubmit={handleCreate}>
        <Form.Group className='mx-5'>
          <Form.Label>title</Form.Label>
          <Form.Control
            isInvalid={!!errors.title}
            onChange={({ target }) => {
              setTitle(target.value)
              setError({ ...errors, title: '' })
            }}
            value={title}
            type='text'
          />
          <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mx-5'>
          <Form.Label>author</Form.Label>
          <Form.Control
            isInvalid={!!errors.author}
            onChange={({ target }) => {
              setAuthor(target.value)
              setError({ ...errors, author: '' })
            }}
            value={author}
            type='text'
          />
        </Form.Group>
        <Form.Group className='mx-5 mb-2'>
          <Form.Label>url</Form.Label>
          <Form.Control
            isInvalid={!!errors.url}
            onChange={({ target }) => {
              setUrl(target.value)
              setError({ ...errors, url: '' })
            }}
            value={url}
            type='text'
          />
        </Form.Group>
        <Button type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm
