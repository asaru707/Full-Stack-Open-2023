import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlogLike,
    onSuccess: (l) => {
      const blogs = queryClient.getQueryData(['blogs'])

      const updatedBlogs = blogs.map((b) => (b.id === l.id ? l : b))
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
  })

  const removeMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== id)
      )
    },
  })
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeMutation.mutate(blog.id)
    }
  }

  const handleLikes = () => {
    likeMutation.mutate({ blogId: blog.id, likes: blog.likes + 1 })
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
        likes {blog.likes}
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
  user: PropTypes.object.isRequired,
}
export default Blog
