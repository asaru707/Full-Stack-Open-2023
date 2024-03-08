import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'

const User = () => {
  const navigate = useNavigate()
  const userId = useMatch('/users/:id')?.params?.id
  const users = useSelector(({ users }) => users)
  const user = users.find(({ id }) => id === userId)

  useEffect(() => {
    if (!user) navigate('/users')
  })

  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
