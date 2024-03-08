import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Card } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
  const createBlogRef = useRef()

  const toggleVisibility = () => {
    createBlogRef.current.toggleVisibility()
  }

  return (
    <div>
      <div  className='d-flex'>
        <Card className='w-50 bg-0'>
          <Togglable buttonLabel='create new blog' ref={createBlogRef}>
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
        </Card>
      </div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )
      })}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}
export default Blogs
