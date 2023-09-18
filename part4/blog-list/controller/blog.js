const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({
    url: request.body.url,
    title: request.body.title,
    author: request.body.author,
    user: user.id,
    likes: request.body.likes,
  })

  const result = await blog.save()

  user.blogs = user.blogs ? user.blogs.concat(result._id) : [result._id]

  await User.findByIdAndUpdate(user._id, user)

  response.status(201).json(result)
})

blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })
  if (blog.user.toString() !== user.id.toString())
    return response.status(403).json({ error: 'unauthorizated action' })
  const res = await Blog.findByIdAndRemove(request.params.id)
  response.status(res ? 204 : 404).end()
})

blogRouter.put('/:id', async (request, response) => {
  const res = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
  response.status(202).json(res)
})

module.exports = blogRouter
