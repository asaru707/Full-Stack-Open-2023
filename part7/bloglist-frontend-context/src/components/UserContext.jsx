import { createContext, useContext, useReducer } from 'react'
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [_, dispatch] = useContext(UserContext)
  return dispatch
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return <UserContext.Provider value={[user, userDispatch]}>{props.children}</UserContext.Provider>
}

export default UserContext
