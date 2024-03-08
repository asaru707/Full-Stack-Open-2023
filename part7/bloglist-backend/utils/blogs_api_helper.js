const blog = require('../models/blog')

const blogs = [
  {
    title: 'Sample Blog Title 1',
    author: 'Author 1',
    url: 'https://example.com/blog1',
    likes: 10,
  },
  {
    title: 'Sample Blog Title 2',
    author: 'Author 2',
    url: 'https://example.com/blog2',
    likes: 20,
  },
  {
    title: 'Sample Blog Title 3',
    author: 'Author 3',
    url: 'https://example.com/blog3',
    likes: 30,
  },
]

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { blogs, blogsInDb }
