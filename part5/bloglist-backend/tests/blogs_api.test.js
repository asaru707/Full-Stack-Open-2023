const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const helper = require('../utils/blogs_api_helper')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)
let user
beforeEach(async () => {
  await User.deleteMany({})
  const res = await api
    .post('/api/users/')
    .send({ username: 'root', name: 'root', password: 'root' })
  user = res.body
  await Blog.deleteMany({})
  for (let b of helper.blogs) {
    b.user = user.id
    let newBlog = new blog(b)
    await newBlog.save()
  }
})
describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('blogs list are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
  }, 10000)

  test('existence of propertry id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 10000)
})
describe('when creating new blog', () => {
  let authorization = null

  beforeEach(async () => {
    const response = await api.post('/api/login').send({ username: 'root', password: 'root' })
    authorization = { Authorization: `Bearer ${response.body.token}` }
  })
  test('create a new blog', async () => {
    const newBlog = {
      title: 'Sample Blog Title 4',
      author: 'Author 2',
      url: 'https://example.com/blog4',
      likes: 0,
      user: user.id,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length + 1)
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(({ title }) => title)
    expect(titles).toContain(newBlog.title)
  }, 10000)

  test('default value of like property is 0', async () => {
    const newBlog = {
      title: 'Sample Blog Title 4',
      author: 'Author 2',
      url: 'https://example.com/blog4',
      user: user.id,
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  }, 10000)

  test('missing url expect 400 status code', async () => {
    const newBlog = {
      author: 'Author 5',
      title: 'title',
    }
    await api.post('/api/blogs').send(newBlog).set(authorization).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  }, 10000)

  test('missing title expect 400 status code', async () => {
    const newBlog = {
      author: 'Author 5',
      url: 'https://example.com',
    }
    await api.post('/api/blogs').send(newBlog).set(authorization).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  }, 10000)

  test('create a blog without authorization expect 401', async () => {
    const newBlog = {
      title: 'Sample Blog Title 4',
      author: 'Author 2',
      url: 'https://example.com/blog4',
      user: user.id,
    }
    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  }, 10000)
})

describe('when deleting a blog', () => {
  let authorization = null

  beforeEach(async () => {
    const response = await api.post('/api/login').send({ username: 'root', password: 'root' })
    authorization = { Authorization: `Bearer ${response.body.token}` }
  })

  test('succeeds with status code 204', async () => {
    const [blog] = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blog.id}`).set(authorization).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

    const titles = blogsAtEnd.map(({ title }) => title)
    expect(titles).not.toContain(blog.title)
  }, 10000)

  test('delete without authorization expect', async () => {
    const [blog] = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blog.id}`).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)

    const titles = blogsAtEnd.map(({ title }) => title)
    expect(titles).toContain(blog.title)
  }, 10000)

  test('delete with wrong authorization expect 403', async () => {
    const newUser = { username: 'salleh1', name: 'Arto Salleh', password: 'salleh1' }
    await User.deleteOne({ username: newUser.username })
    await api.post('/api/users/').send(newUser)

    const response = await api.post('/api/login').send(newUser)
    authorization = { Authorization: `Bearer ${response.body.token}` }

    let blogsAtEnd = await helper.blogsInDb()

    await api.delete(`/api/blogs/${blogsAtEnd[0].id}`).set(authorization).expect(403)

    blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.blogs.length)

    const titles = blogsAtEnd.map(({ title }) => title)

    expect(titles).toContain(blogsAtEnd[0].title)
  }, 10000)
})

describe('when updating a blog', () => {
  test('succeeds with status code 202 and return json', async () => {
    const [blog] = await helper.blogsInDb()

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ likes: 55 })
      .expect(202)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find((b) => b.id === blog.id)
    expect(updatedBlog.likes).toBe(55)
  }, 10000)

  test('fails with status code 400 if data invalid', async () => {
    const [blog] = await helper.blogsInDb()

    await api.put(`/api/blogs/${blog.id}`).send({ likes: 'new title' }).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blog.likes)
  }, 10000)
})
afterAll(async () => {
  await mongoose.connection.close()
})
