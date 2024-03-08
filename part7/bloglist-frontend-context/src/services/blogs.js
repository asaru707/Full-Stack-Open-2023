import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (blog) => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const request = await axios.post(baseUrl, blog, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    return request.data
  } catch (error) {
    return { error: 'blog creation failed' }
  }
}

const updateBlogLike = async ({ blogId, likes }) => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const request = await axios.put(
      `${baseUrl}/${blogId}`,
      { likes },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    return request.data
  } catch (error) {
    return { error: 'like updation failed' }
  }
}

const removeBlog = async (blogId) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  try {
    await axios.delete(`${baseUrl}/${blogId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    return blogId
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, createBlog, updateBlogLike, removeBlog }
