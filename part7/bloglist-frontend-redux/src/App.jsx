import { useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogsReducer'
import { removeUser, set } from './reducers/userReducer'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { Container, Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const navigate = useNavigate()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(set(user))
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const userLogout = () => dispatch(removeUser())

  if (user === null) return <LoginForm />

  const sortedBlogs = blogs.slice(0).sort((a, b) => b.likes - a.likes)

  return (
    <div className='container'>
      {/* <div>
        <Link style={{ padding: '2px' }} to='/blogs'>
          blogs
        </Link>
        <Link style={{ padding: '2px' }} to='/users'>
          users
        </Link>
        {user.name} logged in
        <button style={{ margin: '2px' }} onClick={userLogout}>
          logout
        </button>
      </div> */}
      {/* <h2>blog app</h2> */}
      <Navbar >
        <Container>
          <Navbar.Brand href='/'>Blog App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Nav className='me-auto'>
              <Nav.Link href='/blogs'>blogs</Nav.Link>
              <Nav.Link href='/users'>users</Nav.Link>
            </Nav>
          <Navbar.Text className='mx-1'>Signed in as: {user.name}</Navbar.Text>
            <Nav.Link onClick={userLogout} href='/login'>
              logout
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Notification />
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<Blogs blogs={sortedBlogs} user={user} />} />
        <Route path='/blogs' element={<Blogs blogs={sortedBlogs} user={user} />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog blogs={blogs} user={user} />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
