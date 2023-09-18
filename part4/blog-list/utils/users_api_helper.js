const User = require('../models/user')

const users = [
  { username: 'hellas', name: 'Arto Hellas', password: 'hellas' },
  { username: 'mluukkai', name: 'Matti Luukkainen', password: 'mluukkai' },
]

UsersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = { users, UsersInDb }
