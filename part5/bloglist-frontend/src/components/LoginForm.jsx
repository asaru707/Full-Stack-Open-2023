import { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import Notification from './Notification'
const LoginForm = ({ username, password, setUsername, setPassword, setUser }) => {
  const [loginInfo, setLoginInfo] = useState({ type: '', message: '' })

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await loginService.login({ username, password })
    if (user.error) {
      setLoginInfo({ type: 'error', message: user.error })
      return setTimeout(() => setLoginInfo({ type: '', message: '' }), 5000)
    }
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification info={loginInfo} />
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default LoginForm
