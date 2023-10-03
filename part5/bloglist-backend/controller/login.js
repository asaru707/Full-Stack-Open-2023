const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect))
    return response.status(401).json({ error: 'invaild username or password' })

  const userForToken = { username: user.username, id: user.id }
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
