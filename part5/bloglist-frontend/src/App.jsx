import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
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

  return <Blogs blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs} />
}

export default App
