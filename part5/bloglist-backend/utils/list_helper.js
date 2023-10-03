const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, { likes }) => sum + likes, 0)

const favoriteBlog = (blogs) => {
  const mostLikesBlog = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )
  return {
    title: mostLikesBlog.title,
    author: mostLikesBlog.author,
    likes: mostLikesBlog.likes,
  }
}
const findAuthorStats = (blogs, key) => {
  const authorStats = {}
  blogs.forEach((blog) => {
    const { author } = blog
    if (!authorStats[author]) authorStats[author] = 0
    authorStats[author] += key === 'blogs' ? 1 : blog.likes
  })
  return authorStats
}

const blogObjectToArray = (obj, key) => {
  return Object.keys(obj).map((author) => ({
    author,
    [key]: obj[author],
  }))
}

const mostBlogs = (blogs) => {
  const authorStats = findAuthorStats(blogs, 'blogs')
  const blogCountArray = blogObjectToArray(authorStats, 'blogs')
  return blogCountArray.reduce((prev, current) =>
    prev.blogs > current.blogs ? prev : current
  )
}

const mostLikes = (blogs) => {
  const authorStats = findAuthorStats(blogs, 'likes')
  const likesCountArray = blogObjectToArray(authorStats, 'likes')
  return likesCountArray.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes, favoriteBlog }
