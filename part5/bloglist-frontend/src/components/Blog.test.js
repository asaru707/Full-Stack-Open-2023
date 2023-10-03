import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('initially a blog render only title and author', () => {
  const blog = {
    title: 'test blog',
    author: 'blog author',
    url: 'https://test.blog',
    likes: 0,
    id: '650ff7b0c08961fecc883536',
    user: { username: 'test', name: 'test', blogs: [], id: '650ff792c08961fecc88352e' },
  }

  const user = {
    token: 'token',
    username: 'test',
    name: 'test',
  }
  const { container } = render(<Blog blog={blog} user={user} handleBlogRemove={() => {}} />)
  const url = container.querySelector('url')
  expect(url).toBeNull()
  const likes = container.querySelector('likes')
  expect(likes).toBeNull()
})

test('onclick view a blog rendered url and likes', async () => {
  const blog = {
    title: 'test blog',
    author: 'blog author',
    url: 'https://test.blog',
    likes: 0,
    id: '650ff7b0c08961fecc883536',
    user: { username: 'test', name: 'test', blogs: [], id: '650ff792c08961fecc88352e' },
  }

  const user = {
    token: 'token',
    username: 'test',
    name: 'test',
  }
  const { container } = render(<Blog blog={blog} user={user} handleBlogRemove={() => {}} />)
  const blogUser = userEvent.setup()
  const button = screen.getByText('view')
  await blogUser.click(button)
  const url = container.querySelector('.url')
  expect(url).toBeDefined()
  const likes = container.querySelector('.likes')
  expect(likes).toBeDefined()
})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'test blog',
    author: 'blog author',
    url: 'https://test.blog',
    likes: 0,
    id: '650ff7b0c08961fecc883536',
    user: { username: 'test', name: 'test', blogs: [], id: '650ff792c08961fecc88352e' },
  }
  const user = {
    token: 'token',
    username: 'test',
    name: 'test',
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} handleBlogRemove={() => {}} handleBlogLikes={mockHandler} />)
  const blogUser = userEvent.setup()

  const viewButton = screen.getByText('view')

  await blogUser.click(viewButton)

  const likeButton = screen.getByText('like')

  await blogUser.click(likeButton)
  await blogUser.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
