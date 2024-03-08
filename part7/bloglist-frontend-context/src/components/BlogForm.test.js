import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('create a new blog', async () => {
  const blog = {
    title: 'test blog',
    author: 'blog author',
    url: 'https://test.blog',
    likes: 0,
    id: '650ff7b0c08961fecc883536',
    user: { username: 'test', name: 'test', blogs: [], id: '650ff792c08961fecc88352e' },
  }

  const mockHandler = jest.fn()

  const { container } = render(<BlogForm handleBlogCreate={mockHandler} />)

  const blogUser = userEvent.setup()

  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')

  const blogCreateButton = screen.getByText('create')

  await blogUser.type(titleInput, blog.title)
  await blogUser.type(authorInput, blog.author)
  await blogUser.type(urlInput, blog.url)

  await blogUser.click(blogCreateButton)

  const [createdBlog] = mockHandler.mock.calls[0]

  expect(createdBlog.title).toBe(blog.title)
  expect(createdBlog.author).toBe(blog.author)
  expect(createdBlog.url).toBe(blog.url)
})
