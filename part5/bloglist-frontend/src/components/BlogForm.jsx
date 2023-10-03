import { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    await handleBlogCreate({ title, author, url })
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

BlogForm.propTypes = {
  handleBlogCreate: PropTypes.func.isRequired,
}

export default BlogForm
