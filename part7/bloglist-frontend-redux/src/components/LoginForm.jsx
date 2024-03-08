import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import { set } from '../reducers/userReducer'
import { Button, Card, CardBody, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(({ user }) => user)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    if (user) navigate('/')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await loginService.login({ username, password })
    if (user.error) {
      console.log(user.error)
      return setErrors({ password: 'wrong password', username: 'wrong username' })
    }
    dispatch(set(user))
    window.localStorage.setItem('user', JSON.stringify(user))
    setUsername('')
    setPassword('')
  }

  const handleUsernameInput = ({ target }) => {
    if (errors.username) setErrors({ ...errors, username: '' })
    setUsername(target.value)
  }

  const handlePasswordInput = ({ target }) => {
    if (errors.password) setErrors({ ...errors, password: '' })
    setPassword(target.value)
  }
  return (
    <div className='container d-flex justify-content-center mb-4'>
      <Card>
        <div className='text-center mt-3'>
          <h3>Login to application</h3>
        </div>
        <CardBody>
          <Form noValidate onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                isInvalid={!!errors.username}
                type='text'
                value={username}
                onChange={handleUsernameInput}
              />
              <Form.Control.Feedback type='invalid'>Wrong username</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='text'
                isInvalid={!!errors.password}
                value={password}
                onChange={handlePasswordInput}
              />
              <Form.Control.Feedback type='invalid'>Wrong password</Form.Control.Feedback>
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant='primary' type='submit'>
                login
              </Button>
            </div>
            <Form.Control.Feedback>Please choose a username.</Form.Control.Feedback>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginForm
