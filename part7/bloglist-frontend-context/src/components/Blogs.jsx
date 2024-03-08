import { useRef } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { useUserDispatch } from './UserContext'

const Blogs = ({ blogs, user }) => {
  const createBlogRef = useRef()
  const dispatch = useUserDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch({ type: 'CLEAR' })
  }

  const toggle = async () => {
    createBlogRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={createBlogRef}>
        <BlogForm toggle={toggle} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blogs
