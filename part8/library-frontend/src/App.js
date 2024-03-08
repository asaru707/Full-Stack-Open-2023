import Authors from './components/Authors'
import Books from './components/Books'
import NewBook, { updateCache } from './components/NewBook'
import { useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useState } from 'react'
import Notification from './components/Notification'

const App = () => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const user = localStorage.getItem('user-token')
  const [notification, setNotification] = useState({ message: null, type: null })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, book)
    },
  })
  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('user-token')
    navigate('login')
    client.resetStore()
  }
  const Notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(''), 3000)
  }
  return (
    <div>
      <div>
        <button onClick={() => handleNavigate('authors')}>authors</button>
        <button onClick={() => handleNavigate('books')}>books</button>
        {user && <button onClick={() => handleNavigate('new-book')}>add book</button>}
        {user && <button onClick={() => handleNavigate('recommend')}>recommend</button>}
        {user && <button onClick={handleLogout}>logout</button>}
        {!user && <button onClick={() => handleNavigate('login')}>login</button>}
      </div>
      <Notification message={notification.message} type={notification.type} />
      <Routes>
        <Route path='/' element={<Authors user={user} />} />
        <Route path='/authors' element={<Authors user={user} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/new-book' element={<NewBook Notify={Notify} />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/recommend' element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App
