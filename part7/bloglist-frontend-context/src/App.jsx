import { useContext, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { useQuery } from '@tanstack/react-query'
import UserContext from './components/UserContext'

const App = () => {
  const [user, dispatch] = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const payload = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET', payload })
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  })
  if (result.isLoading) return <div>loading...</div>
  const blogs = result.data

  if (user === null) return <LoginForm />
  blogs.sort((a, b) => b.likes - a.likes)
  return <Blogs blogs={blogs} user={user} />
}

export default App
