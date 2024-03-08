import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch } from './UserContext'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationDispatch = useUserDispatch()
  const userDispatch = useUserDispatch()
  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await loginService.login({ username, password })
    if (user.error) {
      notificationDispatch({
        type: 'SET',
        payload: { message: 'wrong username and password', type: 'error' },
      })
      return setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    }
    window.localStorage.setItem('user', JSON.stringify(user))
    userDispatch({ type: 'SET', payload: user })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            className='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            className='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
