import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'

const AuthorBirthYear = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateBorn] = useMutation(UPDATE_BORN)

  const handleUpdateAuthor = (event) => {
    event.preventDefault()

    updateBorn({
      variables: { name, born: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }],
    })

    setBorn('')
    setName('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdateAuthor}>
        <select defaultValue='' onChange={(e) => setName(e.target.value)}>
          {authors.map((a) => (
            <option value={a.name} key={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input name='born' value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYear
