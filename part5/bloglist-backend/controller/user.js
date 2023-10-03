const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, password: passwordHash })
  const res = await user.save()
  response.status(201).json(res)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

module.exports = userRouter
