import { useQuery } from '@apollo/client'
import { FILTER_BOOKS, USER } from '../queries'

const Recommend = () => {
  const result = useQuery(USER)
  const genre = result?.data?.me?.favoriteGenre
  const booksData = useQuery(FILTER_BOOKS, {
    variables: { genre },
    skip: !result.data,
  })
  if (!booksData || !booksData.data) return <div>loading...</div>
  const books = booksData.data.allBooks
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>patterns</b>
      </div>
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
    </div>
  )
}

export default Recommend
