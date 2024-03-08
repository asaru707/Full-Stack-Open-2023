import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { likeBlog, removeBlog, update } from '../reducers/blogsReducer'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
const Blog = ({ blogs, user }) => {
  const navitage = useNavigate()
  const dispatch = useDispatch()
  const blogId = useMatch('/blogs/:id')?.params?.id

  const blog = blogs.find((blog) => blog.id === blogId)

  const handleLike = () => {
    dispatch(likeBlog(blog.id, blog.likes + 1))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    if (!comment) return
    const res = await blogService.commentBlog(blog.id, comment)
    dispatch(update(res))
  }

  useEffect(() => {
    if (!blog) navitage('/')
  })

  if (!blog) return null
  return (
    <div>
      <div className='mb-5 blog-backgroud'>
        <h2>{blog.title}</h2>
        <div>
          <Link to={blog.url}>{blog.url}</Link>
        </div>
        <div>
          {blog.likes} likes
          <Button className='mx-1' size='sm' onClick={handleLike}>
            like
          </Button>
        </div>
        <div>added by {blog.author}</div>
        {user.username === blog.user.username && (
          <Button className='mx-1' size='sm' variant='danger' onClick={handleRemove}>
            remove
          </Button>
        )}
      </div>
      <h1 className='display-8'>comments</h1>
      <Form onSubmit={handleComment}>
        <InputGroup className='custom-input'>
          <FormControl className='' type='text' name='comment' />
          <Button type='submit' variant='secondary'>
            add comment
          </Button>
        </InputGroup>
      </Form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment.id}>{comment.comment}</li>
        })}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog
