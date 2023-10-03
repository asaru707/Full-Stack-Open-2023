const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../utils/users_api_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of helper.users) {
    let newUser = new User(user)
    await newUser.save()
  }
})

describe('when initially users saved', () => {
  test('users are return as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.users.length)
  }, 10000)
})

describe('when create a new user', () => {
  test('create a new user expect 201', async () => {
    const newUser = { name: 'John Doe', username: 'john', password: '123' }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const userAtEnd = await helper.UsersInDb()
    expect(userAtEnd).toHaveLength(helper.users.length + 1)
  }, 10000)

  test('create a new user without username expect 400', async () => {
    const newUser = { name: 'John Doe', password: '123' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.error).toBe(
      'User validation failed: username: Path `username` is required.'
    )
    const userAtEnd = await helper.UsersInDb()
    expect(userAtEnd).toHaveLength(helper.users.length)
  }, 10000)

  test('create a new user with username less than 3 length expect 400', async () => {
    const newUser = { name: 'John Doe', username: 'jo', password: '123' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.error).toBe(
      'User validation failed: username: password must be at least 3 characters long'
    )
    const userAtEnd = await helper.UsersInDb()
    expect(userAtEnd).toHaveLength(helper.users.length)
  }, 10000)

  test('create a new user without password expect 400', async () => {
    const newUser = { name: 'John Doe', username: 'john' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.error).toBe('password is required')
    const userAtEnd = await helper.UsersInDb()
    expect(userAtEnd).toHaveLength(helper.users.length)
  }, 10000)

  test('create a new user with password less then three length expect 400', async () => {
    const newUser = { name: 'John Doe', username: 'john', password: '12' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.error).toBe(
      'password must be at least 3 characters long'
    )
    const userAtEnd = await helper.UsersInDb()
    expect(userAtEnd).toHaveLength(helper.users.length)
  }, 10000)

  test('create a new user with username already exists expect 400', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.users[0])
      .expect(400)
    expect(response.body.error).toBe(
      'User validation failed: username: username already exists'
    )
    const userAtEnd = await helper.UsersInDb()
    expect(userAtEnd).toHaveLength(helper.users.length)
  }, 10000)
})

afterAll(async () => {
  await mongoose.connection.close()
})
