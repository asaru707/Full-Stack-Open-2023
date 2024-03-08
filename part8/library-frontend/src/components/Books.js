import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, FILTER_BOOKS, UPDATE_USER, USER } from '../queries'

const Books = () => {
  const [filter, setFilter] = useState('all')
  const [genres, setGenres] = useState([])
  const variables = {}
  const user = useQuery(USER)
  const [updateUserFavGenre] = useMutation(UPDATE_USER, {
    update: (cache, response) => {
      cache.updateQuery({ query: USER }, ({ me }) => {
        return {
          me,
        }
      })
    },
  })
  if (filter !== 'all') variables.genre = filter
  const result = useQuery(filter !== 'all' ? FILTER_BOOKS : ALL_BOOKS, { variables })
  if (result.loading) return <div>loading...</div>

  const handleFilter = (genre) => {
    setFilter(genre)
    if (user.data.me) updateUserFavGenre({ variables: { favoriteGenre: genre } })
  }

  let books = result.data.allBooks
  if (filter === 'all') {
    books.forEach((book) => {
      book.genres.forEach((genre) => {
        if (!genres.includes(genre)) setGenres(genres.concat(genre))
      })
    })
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre, index) => (
        <button key={`${genre}-${index}`} onClick={() => handleFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter('all')}>all</button>
    </div>
  )
}

export default Books
