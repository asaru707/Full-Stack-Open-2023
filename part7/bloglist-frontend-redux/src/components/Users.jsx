import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { set } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  let users = useSelector(({ users }) => users)

  useEffect(() => {
    axios.get('http://localhost:3003/api/users').then((res) => {
      dispatch(set(res.data))
    })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
