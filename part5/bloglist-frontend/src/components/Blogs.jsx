import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blogs = ({ blogs, user, setUser, setBlogs, mostLikedBlog, getMostLikedBlog, fetchBlogs }) => {
  const [blogInfo, setBlogInfo] = useState({ type: '', message: '' })

  const createBlogRef = useRef()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleBlogRemove = async (blogId) => {
    const res = await blogService.removeBlog(blogId)
    if (res) setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  const handleBloglikes = async (blogId, like) => {
    const res = await blogService.updateBlogLike(blogId, like)
    const updatedBlogs = [...blogs.filter((blog) => blog.id !== blogId), res]
    const mostLikedChanged = getMostLikedBlog(updatedBlogs)
    if (!mostLikedBlog || mostLikedBlog.id !== mostLikedChanged.id) fetchBlogs()
  }

  const handleBlogCreate = async (b) => {
    const blog = await blogService.createBlog(b)
    if (blog.error) {
      setBlogInfo({ type: 'error', message: 'failed' })
      return setTimeout(() => setBlogInfo({ type: '', message: '' }), 5000)
    }
    blog.user = user
    setBlogs(blogs.concat(blog))
    createBlogRef.current.toggleVisibility()
    setBlogInfo({ type: 'success', message: `a new blog ${blog.title} by ${blog.author} added` })

    setTimeout(() => setBlogInfo({ type: '', message: '' }), 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={blogInfo} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={createBlogRef}>
        <BlogForm handleBlogCreate={handleBlogCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleBlogRemove={handleBlogRemove}
          handleBlogLikes={handleBloglikes}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
}
export default Blogs
