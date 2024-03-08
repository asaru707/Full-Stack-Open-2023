import {  useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../queries'

const LoginForm = () => {
  const navigate = useNavigate()
  const [login, result] = useMutation(LOGIN)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      if (token) {
        localStorage.setItem('user-token', token)
        navigate('/')
      }
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
