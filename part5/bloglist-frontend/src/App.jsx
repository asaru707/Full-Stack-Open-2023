import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mostLikedBlog, setMostLikedBlog] = useState(null)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
    if (blogs.length > 1) setMostLikedBlog(getMostLikedBlog(blogs))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const getMostLikedBlog = (blogs) =>
    blogs.reduce((prev, next) => (next.likes > prev.likes ? next : prev))

  if (user === null)
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setUser={setUser}
      />
    )

  return (
    <Blogs
      blogs={blogs}
      user={user}
      setUser={setUser}
      setBlogs={setBlogs}
      mostLikedBlog={mostLikedBlog}
      getMostLikedBlog={getMostLikedBlog}
      fetchBlogs={fetchBlogs}
    />
  )
}

export default App
