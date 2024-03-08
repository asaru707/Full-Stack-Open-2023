import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

export const updateCache = (cache, query, book) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, (res) => {
    if (res && res.allBooks) {
      return {
        allBooks: uniqByName(res.allBooks.concat(book)),
      }
    }
  })
}

const NewBook = ({ Notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
    onError: (error) => {
      if (error.graphQLErrors[0].extensions.error.errors.title) {
        Notify('title to be unique', 'error')
      } else {
        Notify(error.graphQLErrors[0].extensions.error.message, 'error')
      }
    },
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      Notify(`book ${title} added!`)
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, published: Number(published), author, genres },
    })

    // setTitle('')
    // setPublished('')
    // setAuthor('')
    // setGenres([])
    // setGenre('')
    // Notify(`book ${title} added!`)
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
