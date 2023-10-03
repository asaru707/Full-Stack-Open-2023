import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, handleBlogRemove, user, handleBlogLikes }) => {
  const [visible, setVisible] = useState(false)
  const [blogLike, setBlogLike] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await handleBlogRemove(blog.id)
    }
  }

  const handleLikes = async () => {
    const likes = blogLike + 1
    await handleBlogLikes(blog.id, likes)
    setBlogLike(likes)
  }

  if (!visible)
    return (
      <div className='blog' style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button className='hide-view' onClick={() => setVisible(!visible)}>
            {visible ? 'hide' : 'view'}
          </button>
        </div>
      </div>
    )
  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='hide-view' onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div className='url'>{blog.url}</div>
      <div className='likes'>
        likes {blogLike}
        <button className='likes-button' onClick={() => handleLikes()}>
          like
        </button>
      </div>
      <div>{blog.user && blog.user.name}</div>
      {blog.user && blog.user.username === user.username && (
        <button className='remove-button' onClick={handleRemove}>
          remove
        </button>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog
