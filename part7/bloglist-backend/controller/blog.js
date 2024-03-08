const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comments')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user').populate('comments')
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

  let result = await blog.save()

  user.blogs = user.blogs.concat(result._id)

  await User.findByIdAndUpdate(user.id, user)

  result = await Blog.findById(result._id).populate('user').populate('comments')

  response.status(201).json(result)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })
  const newComment = new Comment({ comment: request.body.comment, blog: request.params.id })
  let result = await newComment.save()
  blog.comments = blog.comments.concat(result._id)
  await Blog.findByIdAndUpdate(request.params.id, blog)
  result = await Blog.findById(request.params.id).populate('user').populate('comments')
  response.status(201).json(result)
})

blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })
  if (blog.user.toString() !== user.id.toString())
    return response.status(403).json({ error: 'unauthorizated action' })
  user.blogs = user.blogs.filter((blog) => blog.toString() !== request.params.id)
  const res = await Blog.findByIdAndRemove(request.params.id)
  await User.findByIdAndUpdate(user.id, user)
  response.status(res ? 204 : 404).end()
})

blogRouter.put('/:id', async (request, response) => {
  let res = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )

  res = await Blog.findById(res._id).populate('user').populate('comments')

  response.status(202).json(res)
})

module.exports = blogRouter
